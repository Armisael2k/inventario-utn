import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import pluralize from "@/utils/pluralize";

async function remove(list) {
  try {
    await api.delete("/area/remove", {
      data: {
        list
      }
    });
    toast.success(`${pluralize("Area", "s", list.length)} ${pluralize("eliminada", "s", list.length)}`);
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para eliminar áreas");
        return false;
      case 404:
        toast.error("Ningún área fue eliminada");
        return false;
      default:
        toast.error("Error el eliminar proveedor");
        return false;
    }
  }
}

export default remove;