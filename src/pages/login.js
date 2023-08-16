import withoutAuth from "@/hooks/ssr/without-auth";
import signIn from "@/hooks/account/signIn";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import Logo from "@/assets/logo.png";
import sleep from "@/utils/sleep";
import BackgroundParticles from "@/components/BackgroundParticles";
import FormTextField from "@/components/FormTextField";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Login as LoginIcon
} from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";

const formSchema = yup.object().shape({
  username: 
    yup.string().trim()
    .required("Obligatorio")
    .matches(/^[A-Za-z0-9]*$/, "Solo puede contener letras y números"),
  password:
    yup.string().trim()
    .required("Obligatorio")
    .min(6, "Debe tener mínimo 6 caracteres")
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleSignIn = async (data, e) => {
    await sleep(500);
    await signIn(data.username, data.password);
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/assets/background.png') center center / cover no-repeat rgb(18, 18, 20)"
      }}
    >
      <BackgroundParticles/>
      <Box
        component="form"
        action=""
        onSubmit={handleSubmit(handleSignIn)}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "#FFF",
          boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          paddingX: "40px",
          paddingY: "30px",
          zIndex: 1
        }}
      >
        <Image
          src={Logo}
          height={135}
          alt="Logo"
          priority={true}
          placeholder="blur"
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginTop: 1
          }}
        >
          Acceso
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            marginBottom: 5,
          }}
        >
          Ingresa los datos de tu cuenta.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormTextField
            control={control}
            fieldName="username"
            label="Usuario"
            placeholder="Usuario"
            defaultValue=""
            endAdornment={<PersonIcon/>}
          />
          <FormTextField
            control={control}
            fieldName="password"
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            defaultValue=""
            endAdornment={<LockIcon/>}
          />
        </Box>
        <LoadingButton
          sx={{
            width: "100%",
            marginTop: 5
          }}
          variant="contained"
          type="submit"
          size="large"
          startIcon={<LoginIcon/>}
          loading={isSubmitting}
        >
          Ingresar
        </LoadingButton>
      </Box>
    </Box>
  )
}

export const getServerSideProps = withoutAuth;