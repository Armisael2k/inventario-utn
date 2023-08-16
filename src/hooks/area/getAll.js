import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll(includeFirst) {
  try {
    const { data } = await api.get("/area/getAll", {
      params: { includeFirst }
    });
    return data?.areas;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver áreas");
        return false;
      default:
        toast.error("Error al obtener áreas");
        return false;
    }
  }
}

export default getAll;