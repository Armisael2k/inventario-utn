import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import Router from "next/router";

async function signIn(username, password) {
  try {
    await api.post("/account/authenticate", {
      username,
      password,
    });
    toast.success("Datos correctos");
    Router.replace("/panel");
  } catch (err) {
    switch (err?.response?.status) {
      case 404:
        return toast.error("Usuario no encontrado");
      default:
        return toast.error("La acción no pudo ser completada");
    }
  }
}

export default signIn;