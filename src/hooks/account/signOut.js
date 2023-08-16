import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import Router from "next/router";

export async function signOut() {
  try {
    await api.get("/account/logout");
    Router.replace("/login");
    toast.success("Cerraste sesión");
  } catch (err) {
    toast.error("La acción no pudo ser completada");
  }
}

export default signOut;