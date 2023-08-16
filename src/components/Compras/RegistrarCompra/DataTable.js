import { useState, forwardRef } from "react";
import remove from "@/hooks/purchase/remove";
import Delete from "./Delete";
import FlexBox from "@/components/FlexBox";
import Modal from "@/components/Modal";
import { Typography, Button, Box } from "@mui/material";
import pluralize from "@/utils/pluralize";
import sleep from "@/utils/sleep";
import { toast } from "react-toastify";
import { deparments } from "@/configs/default";
import DataGrid, { SelectColumn } from "react-data-grid";
import copyToClipboard from "@/utils/copyToClipboard";

function DataTable({ rows, loading, onDelete, onLoadingChange }, ref){
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const handleOpenConfirmDelete = () => selectedRows.size > 0 ? setConfirmDeleteOpen(true) : toast.error("Ninguna compra seleccionada");
  const handleCloseConfirmDelete = () => setConfirmDeleteOpen(false);

  const handleDelete = async () => {
    onLoadingChange?.(true);
    handleCloseConfirmDelete();
    await sleep(500);
    await remove(rowSelectionModel);
    onDelete?.(rowSelectionModel);
    onLoadingChange?.(false);
  }

  const handleOpenFile = (row) => {
    if (row.order_filepath !== "") {
      window.open(`/uploads/${row.order_filepath}`);
    } else {
      toast.error("La fila no tiene ningún archivo asociado");
    }
  };

  const handleCopy = ({ sourceColumnKey, sourceRow }) => {
    if ( typeof(sourceRow[sourceColumnKey]) == "string" || typeof(sourceRow[sourceColumnKey]) == "number" ) {
      copyToClipboard(sourceRow[sourceColumnKey]);
    }
  }

  const columns = [
    // SelectColumn,
    { 
      key: "id",
      name: "ID",
    },
    {
      key: "supplier_name",
      name: "Proveedor",
    },
    {
      key: "deparment",
      name: "Departamento",
      formatter: ({ row }) => deparments[row.deparment_id]
    },
    {
      key: "order_no",
      name: "No. Orden",
    },
    {
      key: "order_total",
      name: "Total",
    },
    {
      key: "order_type",
      name: "Tipo",
    },
    {
      key: "order_description",
      name: "Descripción",
    },
    {
      key: "actions",
      name: "",
      formatter: ({ row }) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenFile(row)}
        >
          Archivo
        </Button>
      )
    }
  ];

  return (
    <FlexBox
      flexDirection="column"
      gap={1}
      sx={{
        maxWidth: "100%",
        flexDirection: "column",
        maxHeight: 300,
      }}
    >
      <Typography variant="h5">Compras</Typography>
      {/* <Delete
        onClick={handleOpenConfirmDelete}
        loading={loading}
        qty={selectedRows.size}
      /> */}
      <DataGrid
        className="rdg-light"
        style={{
          minHeight: 300,
        }}
        rows={rows}
        columns={columns}
        rowHeight={50}
        onCopy={handleCopy}
        rowKeyGetter={row => row.id}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
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
        <Typography>¿Estas seguro de eliminar {pluralize("compra", "s", selectedRows.size, true)}?</Typography>
      </Modal> 
    </FlexBox>
  )
}

export default forwardRef(DataTable);