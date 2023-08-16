import { Typography } from "@mui/material";
import FlexBox from "@/components/FlexBox";
import DataTable from "./DataTable";
import Filters from "./Filters";
import { useState } from "react";

function Actions() {
  const [movements, setMovements] = useState([]);
  const [area, setArea] = useState(null);

  const handleUpdate = (newMovements, areaName) => {
    setMovements(newMovements);
    setArea(areaName);
  }
  
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Historial de movimientos</Typography>
      <Filters
        onUpdate={handleUpdate}
      />
      <DataTable
        rows={movements}
        area={area}
      />
    </FlexBox>
  );
}

export default Actions;