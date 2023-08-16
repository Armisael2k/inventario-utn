import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import pluralize from "@/utils/pluralize";

async function remove(list) {
  try {
    await api.delete("/supplier/remove", {
      data: {
        list
      }
    });
    toast.success(`${pluralize("Provedor", "es", list.length)} ${pluralize("eliminado", "s", list.length)}`);
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para eliminar proveedores");
        return false;
      case 404:
        toast.error("Ningún proveedor fue eliminado");
        return false;
      default:
        toast.error("Error el eliminar proveedor");
        return false;
    }
  }
}

export default remove;