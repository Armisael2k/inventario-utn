import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import formatDate from "@/utils/formatDate";

async function getBetween(startDate, endDate) {
  try {
    const { data } = await api.get("/article/getBetween", {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      }
    });
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

export default getBetween;