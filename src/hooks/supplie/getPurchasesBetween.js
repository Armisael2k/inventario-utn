import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import formatDate from "@/utils/formatDate";

async function getPurchasesBetween(startDate, endDate, supplieId) {
  try {
    const { data } = await api.get("/supplie/getPurchasesBetween", {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        supplieId
      }
    });
    return data?.purchases;
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

export default getPurchasesBetween;