import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function edit(id, row) {
  try {
    await api.put("/evaluation/edit", {
      id,
      row
    });
    toast.success("Evaluación modificada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para modificar evaluación");
        return false;
      case 404:
          toast.error("Ninguna evaluación fue modificada");
          return false;
      default:
        toast.error("Error al modificar evaluación");
        return false;
    }
  }
}

export default edit;