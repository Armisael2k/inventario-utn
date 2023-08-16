import { useState, useEffect } from "react";
import FlexBox from "@/components/FlexBox";
import New from "@/components/Compras/EvaluacionProveedor/New";
import DataTable from "@/components/Compras/EvaluacionProveedor/DataTable";
import getAll from "@/hooks/evaluation/getAll";

function EvaluacionProveedor() {
  const [rows, setRows] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const handleLoadingChange = (state) => setLoading(state);
  
  const update = () => {
    getAll().then(rows => {
      setRows(rows || []);
    });
    setLoading(false);
  }

  const updateRow  = (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
  }
  
  const deleteRow  = (deletedRows) => {
    setRows(rows.filter((row) => !deletedRows.includes(row.id)));
  }

  useEffect(() => {
    update();
  }, []);

  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <New
        onAdd={update}
        onLoadingChange={handleLoadingChange}
      />
      <DataTable
        rows={rows}
        loading={loading}
        onUpdate={updateRow}
        onDelete={deleteRow}
        onLoadingChange={handleLoadingChange}
      />
    </FlexBox>
  );
}

export default EvaluacionProveedor;