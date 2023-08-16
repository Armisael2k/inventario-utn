import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

async function getAll() {
  try {
    const { data } = await api.get("/purchase/getAll");
    return data?.purchases;
  } catch (err) {
    console.log("ERRR", err);
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para ver compras");
        return false;
      default:
        toast.error("Error al obtener compras");
        return false;
    }
  }
}

export default getAll;