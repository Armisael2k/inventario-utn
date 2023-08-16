import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll(ncludeFirst) {
  try {
    const { data } = await api.get("/account/getAll");
    return data?.users;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver usuarios");
        return false;
      default:
        toast.error("Error al obtener usuarios");
        return false;
    }
  }
}

export default getAll;