import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getMovementsByArea(areaId) {
  try {
    const { data } = await api.get("/article/getMovementsByArea", {
      params: { areaId }
    });
    return data?.articles;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver los movimientos de inventario");
        return false;
      default:
        toast.error("Error al obtener movimientos de inventario");
        return false;
    }
  }
}

export default getMovementsByArea;