import { Typography } from "@mui/material";
import FlexBox from "@/components/FlexBox";
import DataTable from "./DataTable";
import Filters from "./Filters";
import { useState } from "react";

function Actions() {
  const [purchases, setPurchases] = useState([]);

  const handleUpdate = (newPurchases) => {
    setPurchases(newPurchases);
  }
  
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Historial de compras</Typography>
      <Filters
        onUpdate={handleUpdate}
      />
      <DataTable
        rows={purchases}
      />
    </FlexBox>
  );
}

export default Actions;