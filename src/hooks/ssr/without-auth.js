import { withSessionSsr } from "@/lib/withSession";

const withoutAuth = withSessionSsr(
  async function ({ req }) {
    const session = req.session.account;

    if (session) {
      return {
        redirect: {
          permanent: false,
          destination: "/panel"
        }
      }
    }
    
    return {
      props: {},
    };
  },
);

export default withoutAuth;