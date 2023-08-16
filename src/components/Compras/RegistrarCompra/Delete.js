import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete as DeleteIcon } from "@mui/icons-material";

function Delete({ loading, onClick, qty }) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <LoadingButton
        startIcon={<DeleteIcon/>}
        loading={loading}
        onClick={onClick}
        color="error"
        variant="outlined"
      >
        Eliminar seleccionados ({qty})
      </LoadingButton>
    </Box>
  );
}

export default Delete;