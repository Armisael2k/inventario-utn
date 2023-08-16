import FlexBox from "@/components/FlexBox";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormAutocomplete from "@/components/FormAutocomplete";
import FormTextField from "@/components/FormTextField";
import getSupplies from "@/hooks/supplie/getAll";
import getAreas from "@/hooks/area/getAll";
import { useState } from "react";
import set from "@/hooks/supplie/set";
import sleep from "@/utils/sleep";

const formSchema = yup.object().shape({
  supplie: 
    yup.string().trim()
    .required("Item obligatorio"),
  area: 
    yup.string().trim()
    .required("Área obligatoria"),
  qty: 
    yup.number()
    .min(1, "Cantidad no valida")
    .typeError("Cantidad obligatoria"),
});

function Asignar() {
  const [supplies, setSupplies] = useState([]);
  const [areas, setAreas] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleAsignar = async (data) => {
    await sleep(500);
    const supplieId = supplies.find(supplie => supplie.description === data.supplie).id;
    const areaId = areas.find(area => area.name === data.area).id;
    await set(supplieId, areaId, data.qty);
  }
  
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
      component="form"
      action=""
      onSubmit={handleSubmit(handleAsignar)}
    >
      <Typography variant="h5">Asignación</Typography>
      <FlexBox
        wrap="wrap"
        gap={2}
      >
        <FormAutocomplete
          control={control}
          fieldName="supplie"
          label="Item"
          api={getSupplies}
          isOptionEqualToValue={(option, value) => option?.description === value?.description}
          getOptionLabel={(option) => option?.description}
          onOptionsChange={setSupplies}
          disabled={isSubmitting}
        />
        <FormTextField
          control={control}
          fieldName="qty"
          label="Cantidad"
          placeholder="Cantidad"
          type="number"
          disabled={isSubmitting}
        />
        <FormAutocomplete
          control={control}
          fieldName="area"
          label="Área"
          api={getAreas}
          isOptionEqualToValue={(option, value) => option?.name === value?.name}
          getOptionLabel={(option) => option?.name}
          onOptionsChange={setAreas}
          disabled={isSubmitting}
        />
      </FlexBox>
      <LoadingButton
        sx={{
          alignSelf: "start"
        }}
        variant="contained"
        type="submit"
        loading={isSubmitting}
      >
        Asignar
      </LoadingButton>
    </FlexBox>
  );
}

export default Asignar;