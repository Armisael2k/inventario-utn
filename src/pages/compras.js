import Layout from "@/components/Layout";
import withAuth from "@/hooks/ssr/with-auth";
import EvaluacionProveedor from "@/components/Compras/EvaluacionProveedor";
import RegistrarCompra from "@/components/Compras/RegistrarCompra";

export default function Compras({ account }) {
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
      <EvaluacionProveedor/>
      <RegistrarCompra/>
    </Layout>
  )
}

export const getServerSideProps = withAuth;