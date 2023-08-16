import { api } from "@/services/apiClient";
import formatDate from "@/utils/formatDate";
import { toast } from "react-toastify";


async function add(supplierId, areaId, orderNo, orderType, orderDescription, deparmentId, articles, file) {
  try {
    const form = new FormData();
    form.append("supplierId", supplierId);
    form.append("areaId", areaId);
    form.append("orderNo", orderNo);
    form.append("orderType", orderType);
    form.append("orderDescription", orderDescription);
    form.append("deparmentId", deparmentId);
    form.append("articles", JSON.stringify(articles));
    form.append("file", file);
    await api.post("/purchase/add", form);
    toast.success("Compra agregada");
    return true;
  } catch (err) {
    switch (err?.response?.status) {
      case 403:
        toast.error("No tienes permiso para agregar compras");
        return false;
      case 409:
        toast.error(`Ya hay una compra con el número de orden: ${orderNo}`);
        return false;
      default:
        console.log(err);
        toast.error("Error al agregar compra");
        return false;
    }
  }
}

export default add;