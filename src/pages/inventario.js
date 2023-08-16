import Layout from "@/components/Layout";
import withAuth from "@/hooks/ssr/with-auth";
import Actions from "@/components/Articles/Actions";
import Purchases from "@/components/Articles/Purchases";
import Movements from "@/components/Articles/Movements";
import CanvasDraw from "react-canvas-draw";
import { Box, Button, Typography } from "@mui/material";
import { useRef } from "react";

function CanvaTest() {
  const canvaRef = useRef(null);

  return (
    <>
      <Typography>FIRMA DEMO</Typography>
      <Box
        sx={{
          alignSelf: "start",
          border: "1px solid"
        }}
      >
        <CanvasDraw
          ref={canvaRef}
          brushRadius={5}
        />
      </Box>
      <Button
        sx={{
          alignSelf: "start"
        }}
        variant="outlined"
        onClick={() => {
          canvaRef.current.clear();
        }}
      >
        Limpiar
      </Button>
    </>
  );
}

export default function Inventario({ account }) {
  return (
    <Layout
      account={account}
      sx={{
        marginTop: 4,
        display: "flex",
        gap: 4,
        flexDirection: "column"
      }}
    >
      <Actions/>
      <Purchases/>
      <Movements/>
      <CanvaTest/>
    </Layout>
  )
}

export const getServerSideProps = withAuth;