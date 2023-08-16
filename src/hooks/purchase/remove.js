import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import pluralize from "@/utils/pluralize";

async function remove(list) {
  try {
    await api.delete("/purchase/remove", {
      data: {
        list
      }
    });
    toast.success(`${pluralize("Compra", "s", list.length)} ${pluralize("eliminada", "s", list.length)}`);
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para eliminar compras");
        return false;
      case 404:
        toast.error("Ninguna compra fue eliminada");
        return false;
      default:
        toast.error("Error al eliminar compra");
        return false;
    }
  }
}

export default remove;