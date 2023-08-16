import FlexBox from "@/components/FlexBox";
import Modal from "@/components/Modal";
import add from "@/hooks/supplier/add";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormTextField from "@/components/FormTextField";
import {
  Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import sleep from "@/utils/sleep";
import { useEffect, useState } from "react";

const formSchema = yup.object().shape({
  name: 
    yup.string().trim()
    .required("Obligatorio")
    .matches(/^[ñáéíóú\w\-\s]+$/, "Contiene caracteres invalidos"),
});

function New({ open, onClose, onLoadingChange, onAdd }) {
  const {
    handleSubmit,
    setFocus,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  useEffect(() => {
    onLoadingChange?.(isSubmitting);
  }, [isSubmitting])

  const handleNew = async (data, e) => {
    await sleep(500);
    await add(data.name);
    setFocus("name");
    reset();
    onAdd?.();
  }

  return(
    <Modal
      open={open}
      onClose={onClose}
      title="Nuevo proveedor"
      maxWidth="sm"
      actions={
        <LoadingButton
          form="new"
          type="submit"
          loading={isSubmitting}
        >
          Agregar proveedor
        </LoadingButton>
      }
    >
      <FlexBox
        id="new"
        as="form"
        action=""
        onSubmit={handleSubmit(handleNew)}
        direction="column"
        gap={2}
        sx={{
          paddingTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography sx={{color: "#898989"}}>Información</Typography>
        <FormTextField
          sx={{
            width: "100%"
          }}
          control={control}
          fieldName="name"
          label="Nombre"
          placeholder="Nombre"
          autoFocus
        />
      </FlexBox>
    </Modal>
  );
}

export default New;