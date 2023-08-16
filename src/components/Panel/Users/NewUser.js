import { useState } from "react";
import FlexBox from "@/components/FlexBox";
import Modal from "@/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormTextField from "@/components/FormTextField";
import add from "@/hooks/account/add";
import sleep from "@/utils/sleep";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const formSchema = yup.object().shape({
  name: 
    yup.string().trim()
    .required("Obligatorio")
    .matches(/^([ \u00c0-\u01ffa-zA-Z'\-])+$/, "Contiene caracteres invalidos"),
  username: 
    yup.string().trim()
    .required("Obligatorio")
    .matches(/^[A-Za-z0-9]*$/, "Solo puede contener letras y números"),
  password:
    yup.string().trim()
    .required("Obligatorio")
    .min(6, "Debe tener mínimo 6 caracteres"),
  passwordConfirmation:
    yup.string().trim()
    .required("Obligatorio")
    .oneOf([yup.ref('password')], "Las contraseñas no coinciden")
});

function NewUser({ open, onClose, onAdd }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleNewUser = async (data, e) => {
    await sleep(500);
    const success = await add(data.name, data.username, data.password);
    if ( success ) {
      onAdd?.();
    }
  }

  return(
    <Modal
      open={open}
      onClose={onClose}
      title="Nuevo usuario"
      maxWidth="sm"
      actions={
        <LoadingButton form="new-user" type="submit" loading={isSubmitting}>Crear usuario</LoadingButton>
      }
    >
      <FlexBox
        id="new-user"
        as="form"
        action=""
        onSubmit={handleSubmit(handleNewUser)}
        direction="column"
        gap={2}
        sx={{
          paddingTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography sx={{color: "#898989"}}>Información</Typography>
        <FlexBox
          gap={1}
        >
          <FormTextField
            control={control}
            fieldName="name"
            label="Nombre"
            placeholder="Nombre"
            disabled={isSubmitting}
            fullWidth
          />
          <FormTextField
            control={control}
            fieldName="username"
            label="Usuario"
            placeholder="Usuario"
            disabled={isSubmitting}
            fullWidth
          />
        </FlexBox>
        <FlexBox
          gap={1}
        >
          <FormTextField
            control={control}
            fieldName="password"
            label="Contraseña"
            placeholder="Contraseña"
            disabled={isSubmitting}
            fullWidth
          />
          <FormTextField
            control={control}
            fieldName="passwordConfirmation"
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            disabled={isSubmitting}
            fullWidth
          />
        </FlexBox>
        <FlexBox
          direction="column"
        >
          <Typography sx={{color: "#898989"}}>Permisos</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Permiso 1" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Permiso 2" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Permiso 3" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Permiso 4" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Permiso 5" />
          </FormGroup>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
}

export default NewUser;