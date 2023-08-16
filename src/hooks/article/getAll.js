import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll() {
  try {
    const { data } = await api.get("/article/getAll");
    return data?.articles;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver los articulos de inventario");
        return false;
      default:
        toast.error("Error al obtener articulos de inventario");
        return false;
    }
  }
}

export default getAll;