import { toast } from "react-toastify";

const copyToClipboard = (textToCopy) => {
  let result;
  if (navigator.clipboard && window.isSecureContext) {
      result = navigator.clipboard.writeText(textToCopy);
  } else {
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      result = new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
  }
  result
  .then(() => toast.success("Texto copiado"))
  .catch(() => toast.error("Error al copiar"))
}

export default copyToClipboard;