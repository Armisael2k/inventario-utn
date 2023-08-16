import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function edit(id, row) {
  try {
    await api.put("/supplier/edit", {
      id,
      row
    });
    toast.success("Proveedor modificado");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para modificar proveedores");
        return false;
      case 404:
          toast.error("Ningún proveedor fue modificado");
          return false;
      default:
        toast.error("Error al modificar proveedor");
        return false;
    }
  }
}

export default edit;