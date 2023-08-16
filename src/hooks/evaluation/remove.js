import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import pluralize from "@/utils/pluralize";

async function remove(list) {
  try {
    await api.delete("/evaluation/remove", {
      data: {
        list
      }
    });
    toast.success(`${pluralize("Evaluación", "es", list.length)} ${pluralize("eliminada", "s", list.length)}`);
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para eliminar evaluaciones");
        return false;
      case 404:
        toast.error("Ninguna evaluación fue eliminada");
        return false;
      default:
        toast.error("Error al eliminar evaluación");
        return false;
    }
  }
}

export default remove;