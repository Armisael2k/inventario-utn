import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function add(name, username, password) {
  try {
    await api.post("/account/add", {
      name, username, password
    });
    toast.success("Cuenta agregada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para agregar usuarios");
        return false;
      case 409:
        toast.error(`El usuario ${username} ya esta registrado`);
        return false;
      default:
        toast.error("Error al agregar usuario");
        return false;
    }
  }
}

export default add;