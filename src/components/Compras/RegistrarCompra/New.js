import { useRef, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormTextField from "@/components/FormTextField";
import FormAutocomplete from "@/components/FormAutocomplete";
import getSuppliers from "@/hooks/supplier/getAll";
import getAreas from "@/hooks/area/getAll";
import FlexBox from "@/components/FlexBox";
import {
  AttachFile as AttachFileIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  ListItemButton,
  TextField,
  Box,
  Divider
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { roundTo } from "round-to";
import add from "@/hooks/purchase/add";
import sleep from "@/utils/sleep";
import { toast } from "react-toastify";
import { deparments, deparmentsId } from "@/configs/default";

const formSchema = yup.object().shape({
  supplier: 
    yup.string().trim()
    .required("Proveedor obligatorio"),
  area: 
    yup.string().trim()
    .required("Área obligatoria"),
  deparment: 
    yup.string().trim()
    .required("Departamento obligatorio"),
  order_no:
    yup.number()
    .min(1, "Cantidad no valida")
    .typeError("No. order obligatorio")
    .test("len", "Longitud del texto superada", val => val?.toString().length <= 9),
  order_type: 
    yup.string().trim()
    .required("Tipo obligatorio")
    .matches(/^[ñáéíóú\w\-\s]+$/, "Contiene caracteres invalidos"),
  order_description: 
    yup.string().trim()
});

const newItemSchema = yup.object().shape({
  qty: 
    yup.number()
    .min(1, "Cantidad no valida")
    .typeError("Cantidad obligatoria"),
  description: 
    yup.string().trim()
    .required("Descripción obligatoria"),
  price: 
    yup.number()
    .min(1, "Cantidad no es valida")
    .typeError("Precio obligatorio")
    .test("len", "Longitud del texto superada", val => val?.toString().length <= 15),
});

function New({ onLoadingChange, onAdd }) {
  const [suppliers, setSuppliers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [articles, setArticles] = useState([]);
  const inputFileRef = useRef();

  const [file, setFile] = useState();
  
  const handleFileAdd = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleFileClear = () => {
    inputFileRef.current.value = null;
    setFile();
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  useEffect(() => {
    onLoadingChange?.(isSubmitting);
  }, [isSubmitting])

  const handleRegister = async (data, e) => {
    if ( articles.length === 0 ) { return toast.error("No hay ningún articulo en la lista") }
    await sleep(500);
    const supplierId = suppliers.find((supplier) => supplier.name === data.supplier).id;
    const areaId = areas.find((area) => area.name === data.area).id;
    const deparmentId = deparmentsId[data.deparment];
    await add(supplierId, areaId, data.order_no, data.order_type, data.order_description, deparmentId, articles, file);
    onAdd?.();
  }

  const {
    handleSubmit: handleSubmitNewItem,
    reset: resetNewItem,
    control: controlNewItem
  } = useForm({
    resolver: yupResolver(newItemSchema)
  });

  const handleAddNewItem = ({qty, description, price}) => {
    if ( articles.find(row => row.description === description) ) { return toast.error(`"${description}" ya se encuentra en la lista.`) }
    resetNewItem();
    setArticles(current => [{qty, description, price: roundTo(price, 2)}, ...current]);
  }
  
  const handleDeleteNewItem = (removedIndex) => {
    setArticles(current => current.filter((row, index) => index != removedIndex));
  }

  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Registrar Compra</Typography>
      <FlexBox
        wrap="wrap"
        gap={2}
        component="form"
        action=""
        onSubmit={handleSubmit(handleRegister)}
        id="formRegister"
      >
        <FormAutocomplete
          control={control}
          fieldName="supplier"
          label="Proveedor"
          api={getSuppliers}
          isOptionEqualToValue={(option, value) => option?.name === value?.name}
          getOptionLabel={(option) => option?.name}
          onOptionsChange={setSuppliers}
        />
        <FlexBox
          wrap="wrap"
          gap={2}
        >
          <FormTextField
            control={control}
            fieldName="order_no"
            label="No. Orden"
            placeholder="No. Orden"
            type="number"
            shrink={false}
          />
          <FormTextField
            control={control}
            fieldName="order_type"
            label="Tipo"
            placeholder="Tipo"
            shrink={false}
          />
          <FormAutocomplete
            control={control}
            fieldName="area"
            label="Área solicitante"
            api={() => getAreas(true)}
            isOptionEqualToValue={(option, value) => option?.name === value?.name}
            getOptionLabel={(option) => option?.name}
            onOptionsChange={setAreas}
          />
          <FormAutocomplete
            control={control}
            fieldName="deparment"
            label="Departamento"
            options={deparments}
          />
          <FormTextField
            control={control}
            fieldName="order_description"
            sx={{
              width: "100%"
            }}
            label="Descripción general"
            placeholder="Descripción general"
            shrink={false}
          />
        </FlexBox>
      </FlexBox>
      <Divider sx={{ width: "100%" }}/>
      <FlexBox
        gap={2}
        component="form"
        action=""
        onSubmit={handleSubmitNewItem(handleAddNewItem)}
      >
        <FormTextField
          sx={{
            flex: 1,
          }}
          control={controlNewItem}
          fieldName="qty"
          label="Cantidad"
          placeholder="Cantidad"
          type="number"
        />
        <FormTextField
          sx={{
            flex: 2,
          }}
          control={controlNewItem}
          fieldName="description"
          label="Descripción"
          placeholder="Descripción"
        />
        <FormTextField
          sx={{
            flex: 1,
          }}
          control={controlNewItem}
          fieldName="price"
          label="Precio c/u"
          placeholder="Precio c/u"
          type="number"
          step=".01"
        />
        <Button
          sx={{
            alignSelf: "center",
          }}
          component="label"
          variant="contained"
          color="info"
        >
          {/* Fix bug raro */}
          <button hidden type="submit"/>
          Agregar
        </Button>
      </FlexBox>
        {articles.map((row, index) => (
          <FlexBox
            key={index}
            gap={2}
          >
            <TextField
              sx={{
                flex: 1,
              }}
              disabled
              label="Cantidad"
              size="small"
              value={row.qty}
            />
            <TextField
              sx={{
                flex: 2,
              }}
              disabled
              label="Descripción"
              size="small"
              value={row.description}
            />
            <TextField
              sx={{
                flex: 1,
              }}
              disabled
              label="Precio c/u | Total"
              size="small"
              value={`${row.price} | ${row.price * row.qty}`}
            />
            <Button
              sx={{
                alignSelf: "center",
              }}
              component="label"
              variant="contained"
              color="error"
              onClick={() => handleDeleteNewItem(index)}
            >
              Eliminar
            </Button>
          </FlexBox>
        ))}
      <Typography
        sx={{
          marginLeft: "auto",
        }}
      >
        Total calculado: { roundTo(articles.reduce((total, row) => total + (row.price * row.qty), 0), 2) }
      </Typography>
      <Divider sx={{ width: "100%" }}/>
      <Button
        sx={{
          alignSelf: "end"
        }}
        component="label"
        variant="contained"
        color="info"
      >
        Adjuntar archivo
        <input
          ref={inputFileRef}
          onChange={handleFileAdd}
          type="file"
          hidden
        />
      </Button>
      { file ?
      <>
        <Typography variant="body1">Archivo adjunto</Typography>
        <List
          component={Paper}
        >
          <ListItem
            secondaryAction={
              <IconButton
                onClick={handleFileClear}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon/>
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <AttachFileIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={file.name}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
      : null }
      <LoadingButton
        sx={{
          alignSelf: "end"
        }}
        loading={isSubmitting}
        variant="contained"
        size="large"
        type="submit"
        form="formRegister"
      >
        Registrar
      </LoadingButton>
    </FlexBox>
  );
}

export default New;