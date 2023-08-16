import DataGrid from "react-data-grid";
import copyToClipboard from "@/utils/copyToClipboard";
import FlexBox from "@/components/FlexBox";
import moment from "moment";
import dataToXLSX from "@/utils/dataToXLSX";
import { Button } from "@mui/material";

const columns = [
  { 
    key: "code",
    name: "Clave",
  },
  { 
    key: "description",
    name: "Descripción",
  },
  { 
    key: "price",
    name: "Precio",
  },
  {
    key: "purchase_date",
    name: "Fecha",
    formatter: ({ row }) => moment(row.purchase_date).format("LLL")
  },
];

function DataTablePurchases({ rows }){

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
      { rows.length > 0 ?
        <Button
          sx={{alignSelf: "end"}}
          variant="contained"
          onClick={() => {
            dataToXLSX(`inventario-compras`, columns, rows);
          }}
        >
          Exportar a XLSX
        </Button>
      : null }
    </FlexBox>
  )
}

export default DataTablePurchases;