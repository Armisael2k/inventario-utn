import DataGrid from "react-data-grid";
import copyToClipboard from "@/utils/copyToClipboard";
import FlexBox from "@/components/FlexBox";
import moment from "moment";
import { articleMovements } from "@/configs/default";
import { useEffect, useState, Fragment } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import dataToXLSX from "@/utils/dataToXLSX";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const columns = [
  { 
    key: "code",
    name: "Clave",
  },
  { 
    key: "article_description",
    name: "Descripción",
  },
  { 
    key: "movement",
    name: "Movimiento",
    formatter: ({ row }) => articleMovements[row.movement]
  },
  { 
    key: "start_area_name",
    name: "Área inicial",
  },
  { 
    key: "end_area_name",
    name: "Área final",
  },
  {
    key: "movement_date",
    name: "Fecha",
    formatter: ({ row }) => moment(row.movement_date).format("LLL")
  },
];

const types = [
  "bar",
  "line",
  "area",
  "radar",
  "scatter",
  "heatmap",
];

function DataTablePurchases({ rows, area }){

  const handleCopy = ({ sourceColumnKey, sourceRow }) => {
    if ( typeof(sourceRow[sourceColumnKey]) == "string" || typeof(sourceRow[sourceColumnKey]) == "number" ) {
      copyToClipboard(sourceRow[sourceColumnKey]);
    }
  }

  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState(types[0]);

  useEffect(() => {
    const itemNameList = [];
    for (const item of rows) {
      const ix = itemNameList.findIndex(row => row.article_description == item.article_description);
      if ( ix == -1 ) {
        itemNameList.push({ article_description: item.article_description, qty: 1 });
      }
      else {
        itemNameList[ix].qty++;
      }
    }
    setChartData(itemNameList);
  }, [rows]);

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
            dataToXLSX(`${area}-movimientos`, columns, rows);
          }}
        >
          Exportar a XLSX
        </Button>
      : null }
      { area ?
        <>
          <FlexBox>
            {types.map(type => (
              <Fragment
                key={type}
              >
                <Button
                  variant={type === chartType ? "outlined" : "text"}
                  onClick={() => {
                    setChartType(type);
                  }}
                  >
                  {type}
                </Button>
                { chartType === type ?
                  <Chart
                    options={{
                      chart: {
                        id: "movementChart"
                      },
                      xaxis: {
                        categories: chartData.map(row => row.article_description)
                      },
                      title: {
                        text: area
                      }
                    }}
                    series={[{
                      name: 'item',
                      data: chartData.map(row => row.qty)
                    }]}
                    type={type}
                    width={500}
                  />
                : null }
              </Fragment>
            ))}
          </FlexBox>
        </>
      : null }
    </FlexBox>
  )
}

export default DataTablePurchases;