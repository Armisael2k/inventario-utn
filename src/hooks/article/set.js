import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function set(articleId, areaId) {
  try {
    await api.post("/article/set", {
      articleId, areaId
    });
    toast.success("Articulo asignado");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para asignar articulos");
        return false;
      case 409:
        toast.error(`El articulo ya se encuentra asignado`);
        return false;
      default:
        toast.error("Error al asignar articulo");
        return false;
    }
  }
}

export default set;