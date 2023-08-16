import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import formatDate from "@/utils/formatDate";

async function getBetweenBySupplie(startDate, endDate, supplieId) {
  try {
    const { data } = await api.get("/supplie/getBetweenBySupplie", {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        supplieId
      }
    });
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

export default getBetweenBySupplie;