import { useState, useEffect } from "react";
import FlexBox from "@/components/FlexBox";
import {
  Typography,
  Box,
} from "@mui/material";
import FormAutocomplete from "@/components/FormAutocomplete";
import getAll from "@/hooks/supplier/getAll";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import FormDatePicker from "@/components/FormDatePicker";
import add from "@/hooks/evaluation/add";
import sleep from "@/utils/sleep";

const formSchema = yup.object().shape({
  supplier: 
    yup.string().trim()
    .required("Obligatorio"),
  request_date: 
    yup.string().trim()
    .required("Obligatorio"),
  response_date: 
    yup.string().trim()
    .required("Obligatorio"),
  order_date: 
    yup.string().trim()
    .required("Obligatorio"),
  date_received: 
    yup.string().trim()
    .required("Obligatorio")
});

function New({ onLoadingChange, onAdd }) {
  const [suppliers, setSuppliers] = useState([]);

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
    await sleep(500);
    const supplierId = suppliers.find((supplier) => supplier.name === data.supplier).id;
    await add(supplierId, data.request_date, data.response_date, data.order_date, data.date_received);
    onAdd?.();
  }

  return (
    <FlexBox
      component="form"
      action=""
      onSubmit={handleSubmit(handleRegister)}
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Evaluación proveedor</Typography>
      <FormAutocomplete
        control={control}
        fieldName="supplier"
        label="Proveedor"
        api={getAll}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        getOptionLabel={(option) => option?.name}
        onOptionsChange={setSuppliers}
      />
      <FlexBox
        wrap="wrap"
        gap={2}
      >
        <FormDatePicker
          control={control}
          fieldName="request_date"
          label="Fecha solicitud"
        />
        <FormDatePicker
          control={control}
          fieldName="response_date"
          label="Fecha respuesta"
        />
        <FormDatePicker
          control={control}
          fieldName="order_date"
          label="Fecha orden"
        />
        <FormDatePicker
          control={control}
          fieldName="date_received"
          label="Fecha recibido"
        />
      </FlexBox>
      <Box>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          type="submit"
        >
          Registrar evaluación
        </LoadingButton>
      </Box>
    </FlexBox>
  );
}

export default New;