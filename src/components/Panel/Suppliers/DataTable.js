import { useCallback, useState, forwardRef } from "react";
import edit from "@/hooks/supplier/edit";
import remove from "@/hooks/supplier/remove";
import Delete from "./Delete";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import difference from "@/utils/difference";
import Modal from "@/components/Modal";
import { Typography, Button } from "@mui/material";
import pluralize from "@/utils/pluralize";
import sleep from "@/utils/sleep";
import { toast } from "react-toastify";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from "@mui/icons-material";


function DataTable({ rows, loading, onUpdate, onDelete, onLoadingChange }, ref){
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = useCallback((newRow, oldRow) => 
    new Promise(async (resolve, reject) => {
      const changes = difference(oldRow, newRow);
      if (Object.keys(changes).length === 0) return resolve(oldRow);
      onLoadingChange?.(true);
      await sleep(500);
      const success = await edit(oldRow.id, changes);
      onUpdate?.(success ? newRow : oldRow);
      resolve(success ? newRow : oldRow);
      onLoadingChange?.(false);
    })
  );

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const handleOpenConfirmDelete = () => rowSelectionModel.length > 0 ? setConfirmDeleteOpen(true) : toast.error("Ningún proveedor seleccionado");
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
      field: "name",
      headerName: "Proveedor",
      flex: 1,
      editable: true
    },
    {
      field: "actions",
      type: 'actions',
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={1}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={2}
              icon={<CloseIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={3}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];
      }},
  ];

  return (
    <>
      <DataGrid
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
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
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
        <Typography>¿Estas seguro de eliminar {pluralize("provedor", "es", rowSelectionModel.length, true)}?</Typography>
      </Modal>
    </>
  )
}

export default forwardRef(DataTable);