import { Typography } from "@mui/material";
import FlexBox from "@/components/FlexBox";
import DataTable from "./DataTable";
import Filters from "./Filters";
import { useState } from "react";

function Actions() {
  const [rows, setRows] = useState([]);
  const [area, setArea] = useState(null);

  const handleUpdateRows = (rows, newArea) => {
    setRows(rows);
    setArea(newArea);
  }

  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Historial de áreas</Typography>
      <Filters
        onUpdate={handleUpdateRows}
      />
      <DataTable
        rows={rows}
        area={area}
      />
    </FlexBox>
  );
}

export default Actions;