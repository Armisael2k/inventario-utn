import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function set(supplieId, areaId, qty) {
  try {
    await api.post("/supplie/set", {
      supplieId, areaId, qty
    });
    toast.success("Item asignado");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para asignar items");
        return false;
      case 409:
        toast.error(`El item no tiene suficiente reserva para asignar`);
        return false;
      default:
        toast.error("Error al asignar item");
        return false;
    }
  }
}

export default set;