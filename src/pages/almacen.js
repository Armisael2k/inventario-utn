import Layout from "@/components/Layout";
import withAuth from "@/hooks/ssr/with-auth";
import Actions from "@/components/Supplies/Actions";
import AreaMovements from "@/components/Supplies/AreaMovements";
import SupplieMovements from "@/components/Supplies/SupplieMovements";

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
      <AreaMovements/>
      <SupplieMovements/>
    </Layout>
  )
}

export const getServerSideProps = withAuth;