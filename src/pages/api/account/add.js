import { add } from "@/services/account";
import response from "@/services/response";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

async function handler(req, res) {
  try {
    const { name, username, password } = req.body;
    const result = await add(name, username, password);
    if (result.statusCode === 200) {
      return response(res, ok());
    } else return response(res, result);
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);