import response from "@/services/response";
import { getAll } from "@/services/account"; 
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_area";

async function handler(req, res) {
  try {
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);

    const result = await getAll();
    if (result.statusCode === 200) {
      return response(res, ok(result.body));
    } else {
      return response(res, result);
    }
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);