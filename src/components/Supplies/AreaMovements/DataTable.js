import { Typography } from "@mui/material";
import DataGrid from "react-data-grid";
import copyToClipboard from "@/utils/copyToClipboard";
import FlexBox from "@/components/FlexBox";
import moment from "moment";
import { supplieMovements } from "@/configs/default";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


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

const types = [
  "bar",
  "line",
  "area",
  "radar",
  "scatter",
  "heatmap",
];

function DataTable({ rows, area }){

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
      const ix = itemNameList.findIndex(row => row.supplie_description == item.supplie_description);
      if ( ix == -1 ) {
        itemNameList.push({ supplie_description: item.supplie_description, qty: 1 });
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
      { area ?
        <>
          <FlexBox>
            {types.map(type => (
              <>
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
                        categories: chartData.map(row => row.supplie_description)
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
              </>
            ))}
          </FlexBox>
        </>
      : null }
    </FlexBox>
  )
}

export default DataTable;