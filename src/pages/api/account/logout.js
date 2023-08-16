import response from "@/services/response";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

async function handler(req, res) {
  try {
    req.session.destroy();
    return response(res, ok());
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);