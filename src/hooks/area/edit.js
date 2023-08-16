import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function edit(id, row) {
  try {
    await api.put("/area/edit", {
      id,
      row
    });
    toast.success("Área modificada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para modificar áreas");
        return false;
      case 404:
          toast.error("Ningún área fue modificada");
          return false;
      default:
        toast.error("Error al modificar área");
        return false;
    }
  }
}

export default edit;