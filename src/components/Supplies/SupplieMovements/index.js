import { Typography } from "@mui/material";
import FlexBox from "@/components/FlexBox";
import DataTableMovements from "./DataTableMovements";
import DataTablePurchases from "./DataTablePurchases";
import Filters from "./Filters";
import { useState } from "react";

function Actions() {
  const [purchases, setPurchases] = useState([]);
  const [movements, setMovements] = useState([]);
  const [supplie, setSupplie] = useState([]);

  const handleUpdate = (newPurchases, newMovements, newSupplie) => {
    setPurchases(newPurchases);
    setMovements(newMovements);
    setSupplie(newSupplie);
  }
  
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Typography variant="h5">Historial de Items</Typography>
      <Filters
        onUpdate={handleUpdate}
      />
      <DataTablePurchases
        rows={purchases}
        supplie={supplie}
      />
      <DataTableMovements
        rows={movements}
      />
    </FlexBox>
  );
}

export default Actions;