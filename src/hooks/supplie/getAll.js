import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll() {
  try {
    const { data } = await api.get("/supplie/getAll");
    return data?.supplies;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver los items de almacen");
        return false;
      default:
        toast.error("Error al obtener items de almacen");
        return false;
    }
  }
}

export default getAll;