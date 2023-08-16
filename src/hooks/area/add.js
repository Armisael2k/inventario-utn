import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function add(name) {
  try {
    await api.post("/area/add", {
      name
    });
    toast.success("Área agregada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para agregar áreas");
        return false;
      case 409:
        toast.error(`El área ${name} ya esta registrada`);
        return false;
      default:
        toast.error("Error al agregar área");
        return false;
    }
  }
}

export default add;