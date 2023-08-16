import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function add(name) {
  try {
    await api.post("/supplier/add", {
      name
    });
    toast.success("Proveedor agregado");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para agregar proveedores");
        return false;
      case 409:
        toast.error(`El proveedor ${name} ya esta registrado`);
        return false;
      default:
        toast.error("Error al agregar proveedor");
        return false;
    }
  }
}

export default add;