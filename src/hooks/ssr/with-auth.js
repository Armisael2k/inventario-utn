import { withSessionSsr } from "@/lib/withSession";

const withAuth = withSessionSsr(
  async function ({ req }) {
    const account = req.session.account;

    if (!account) {
      //validate on serverside
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    }
    
    return {
      props: {
        account
      },
    };
  },
);

export default withAuth;