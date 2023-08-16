import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box
} from "@mui/material";

function Modal({ children, open, maxWidth="xs", title, actions, onClose }) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
      >
        {children}
      </DialogContent>
      <DialogActions>
        {actions}
        <Button
          color="error"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;