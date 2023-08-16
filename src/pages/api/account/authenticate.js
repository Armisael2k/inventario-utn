import { auth } from "@/services/account";
import response from "@/services/response";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

async function handler(req, res) {
  try {
    const { username, password } = req.body;
    const result = await auth(username, password);
    if (result.statusCode === 200) {
      const account = {
        id: result.body.account.id,
        name: result.body.account.name,
        username: result.body.account.username,
        permissions: result.body.account.permissions,
      };
      req.session.account = account;
      await req.session.save();
      return response(res, ok({
        account: account
      }));
    } else return response(res, result);
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);