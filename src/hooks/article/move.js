import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function move(articleId, startAreaId, endAreaId) {
  try {
    await api.post("/article/move", {
      articleId, startAreaId, endAreaId
    });
    toast.success("Articulo movido");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para mover articulos");
        return false;
      case 409:
        toast.error(`El articulo no se encuentra en el area seleccionada`);
        return false;
      default:
        toast.error("Error al mover articulo");
        return false;
    }
  }
}

export default move;