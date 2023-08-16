import Layout from "@/components/Layout";
import withAuth from "@/hooks/ssr/with-auth";

export default function inicio({ account }) {
  return (
    <Layout account={account}>
    </Layout>
  )
}

export const getServerSideProps = withAuth;