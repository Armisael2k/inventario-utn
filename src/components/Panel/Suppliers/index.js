import { useEffect, useState } from "react";
import New from "./New";
import getAll from "@/hooks/supplier/getAll";
import FlexBox from "@/components/FlexBox";
import DataTable from "./DataTable";
import {
  Add as AddIcon,
  Cached as CachedIcon
} from "@mui/icons-material";
import {
  Typography,
  Tooltip
} from "@mui/material";
import {
  LoadingButton
} from "@mui/lab";
import sleep from "@/utils/sleep";

function Suppliers() {
  const [loading, setLoading] = useState(true);
  const handleLoadingChange = (state) => setLoading(state);

  const [newOpen, setNewOpen] = useState(false);
  const handleOpenNew = () => setNewOpen(true);
  const handleCloseNew = () => setNewOpen(false);

  const update = () => {
    getAll().then(rows => {
      setRows(rows || []);
    });
    setLoading(false);
  }

  const updateRow  = (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
  }
  
  const deleteRow  = (deletedRows) => {
    setRows(rows.filter((row) => !deletedRows.includes(row.id)));
  }
  
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    update();
  }, []);

  const handleClickRefrescar = async () => {
    setLoading(true);
    await sleep(1000);
    update();
    setLoading(false);
  }
  

  return (
    <>
      <FlexBox>
        <FlexBox
          gap={1}
          grow={1}
          align="center"
        >
          <Typography variant="h5">Proveedores</Typography>
          <Typography variant="h6" sx={{color: "#898989"}}>Gestión</Typography>
          <Tooltip
            title="Refrescar"
            arrow
            onClick={handleClickRefrescar}
          >
            <span>
              <LoadingButton
                loading={loading}
              >
                <CachedIcon/>
              </LoadingButton>
            </span>
          </Tooltip>
        </FlexBox>
        <LoadingButton
          loading={loading}
          variant="contained"
          startIcon={<AddIcon/>}
          onClick={handleOpenNew}
        >
          Agregar proveedor
        </LoadingButton>
      </FlexBox>
      <DataTable
        rows={rows}
        loading={loading}
        onUpdate={updateRow}
        onDelete={deleteRow}
        onLoadingChange={handleLoadingChange}
      />
      <New
        open={newOpen}
        onClose={handleCloseNew}
        onLoadingChange={handleLoadingChange}
        onAdd={update}
      />
    </>
  );
}

export default Suppliers;