import { Typography } from "@mui/material";
import DataGrid from "react-data-grid";
import copyToClipboard from "@/utils/copyToClipboard";
import FlexBox from "@/components/FlexBox";
import moment from "moment";
import { supplieMovements } from "@/configs/default";

const columns = [
  { 
    key: "supplie_description",
    name: "Descripción",
  },
  { 
    key: "qty",
    name: "Cantidad",
  },
  { 
    key: "area_name",
    name: "Área",
  },
  { 
    key: "movement",
    name: "Movimiento",
    formatter: ({ row }) => supplieMovements[row.movement]
  },
  { 
    key: "movement_date",
    name: "Fecha",
    formatter: ({ row }) => moment(row.movement_date).format("LLL")
  },
];

function DataTableMovements({ rows }){

  const handleCopy = ({ sourceColumnKey, sourceRow }) => {
    if ( typeof(sourceRow[sourceColumnKey]) == "string" || typeof(sourceRow[sourceColumnKey]) == "number" ) {
      copyToClipboard(sourceRow[sourceColumnKey]);
    }
  }

  return (
    <FlexBox
      flexDirection="column"
      gap={1}
      sx={{
        maxWidth: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Movimientos</Typography>
      <Typography>Asignado total: { rows.reduce((total, row) => row.movement === 0 ? total + row.qty : total, 0) }</Typography>
      <DataGrid
        className="rdg-light"
        style={{
          minHeight: 300,
          maxHeight: 300,
        }}
        rows={rows}
        columns={columns}
        rowHeight={50}
        onCopy={handleCopy}
        rowKeyGetter={row => row.id}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
      />
    </FlexBox>
  )
}

export default DataTableMovements;