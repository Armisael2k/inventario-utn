import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll() {
  try {
    const { data } = await api.get("/supplier/getAll");
    return data?.suppliers;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver proveedores");
        return false;
      default:
        toast.error("Error al obtener proveedores");
        return false;
    }
  }
}

export default getAll;