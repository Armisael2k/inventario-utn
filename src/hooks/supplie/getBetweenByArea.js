import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import formatDate from "@/utils/formatDate";

async function getBetweenByArea(startDate, endDate, areaId) {
  try {
    const { data } = await api.get("/supplie/getBetweenByArea", {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        areaId
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

export default getBetweenByArea;