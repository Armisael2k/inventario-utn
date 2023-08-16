import { api } from "@/services/apiClient";
import formatDate from "@/utils/formatDate";
import { toast } from "react-toastify";

async function add(supplierId, requestDate, responseDate, orderDate, dateReceived) {
  try {
    await api.post("/evaluation/add", {
      supplierId,
      requestDate: formatDate(requestDate),
      responseDate: formatDate(responseDate),
      orderDate: formatDate(orderDate),
      dateReceived: formatDate(dateReceived)
    });
    toast.success("Evaluación agregada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para agregar evaluaciones");
        return false;
      default:
        toast.error("Error al agregar evaluación");
        return false;
    }
  }
}

export default add;