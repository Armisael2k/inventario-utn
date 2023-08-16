import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import FlexBox from "@/components/FlexBox";
import NewUser from "./NewUser";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import getAll from "@/hooks/account/getAll";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Nombre", flex: 1 },
  { field: "username", headerName: "Usuario", flex: 1 },
  // { field: "permissions", headerName: "Permisos", flex: 1 },
];

function Users() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [rows, setRows] = useState([]);

  const updateRows = async () => {
    const result = await getAll();
    if (result) {
      setRows(result);
    }
  }

  useEffect(() => {
    updateRows();
  }, []);

  return (
    <FlexBox
      direction="column"
      gap={2}
    >
      <FlexBox>
        <FlexBox
          gap={1}
          grow={1}
          align="center"
        >
          <Typography variant="h5">Usuarios</Typography>
          <Typography variant="h6" sx={{color: "#898989"}}>Gestión</Typography>
        </FlexBox>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon/>}
          onClick={handleOpenModal}
        >Nuevo usuario</Button>
      </FlexBox>
      <TextField
        fullWidth
        variant="outlined"
        label={"Buscar"}
        placeholder="Buscar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
      <DataGrid
        sx={{
          minHeight: 400,
        }}
        rows={rows}
        columns={columns}
      />
      <NewUser
        open={open}
        onClose={handleCloseModal}
        onAdd={updateRows}
      />
    </FlexBox>
  );
}

export default Users;