import { useState, forwardRef } from "react";
import remove from "@/hooks/evaluation/remove";
import Delete from "./Delete";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@/components/Modal";
import { Typography, Button } from "@mui/material";
import pluralize from "@/utils/pluralize";
import sleep from "@/utils/sleep";
import { toast } from "react-toastify";
import moment from "moment";


function DataTable({ rows, loading, onDelete, onLoadingChange }, ref){
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const handleOpenConfirmDelete = () => rowSelectionModel.length > 0 ? setConfirmDeleteOpen(true) : toast.error("Ninguna evaluación seleccionada");
  const handleCloseConfirmDelete = () => setConfirmDeleteOpen(false);

  const handleDelete = async () => {
    onLoadingChange?.(true);
    handleCloseConfirmDelete();
    await sleep(500);
    await remove(rowSelectionModel);
    onDelete?.(rowSelectionModel);
    onLoadingChange?.(false);
  }

  const columns = [
    { 
      field: "id",
      headerName: "ID",
     },
    {
      field: "supplier_name",
      headerName: "Proveedor",
      flex: 1,
    },
    {
      field: "request_date",
      headerName: "Fecha solicitud",
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "response_date",
      headerName: "Fecha respuesta",
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "order_date",
      headerName: "Fecha orden",
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "date_received",
      headerName: "Fecha recibido",
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
      flex: 1,
    },
  ];

  return (
    <>
      <DataGrid
        className="rdg-light"
        ref={ref}
        sx={{
          minHeight: 400,
        }}
        loading={loading}
        editMode="row"
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
        rowSelectionModel={rowSelectionModel}
        slots={{
          toolbar: Delete
        }}
        slotProps={{
          toolbar: {
            onClick: handleOpenConfirmDelete,
            loading,
            qty: rowSelectionModel.length
          }
        }}
      />
      <Modal
        title="Confirmacion"
        open={confirmDeleteOpen}
        onClose={handleCloseConfirmDelete}
        actions={
          <Button
            onClick={handleDelete}
          >
            Confirmar
          </Button>
        }
      >
        <Typography>¿Estas seguro de eliminar {pluralize("evaluación", "es", rowSelectionModel.length, true)}?</Typography>
      </Modal>
    </>
  )
}

export default forwardRef(DataTable);