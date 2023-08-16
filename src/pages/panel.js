import Layout from "@/components/Layout";
import withAuth from "@/hooks/ssr/with-auth";
import Users from "@/components/Panel/Users";
import Suppliers from "@/components/Panel/Suppliers";
import Areas from "@/components/Panel/Areas";

export default function Panel({ account }) {
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
      <Users/>
      <Suppliers/>
      <Areas/>
    </Layout>
  )
}

export const getServerSideProps = withAuth;