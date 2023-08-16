import response from "@/services/response";
import { remove } from "@/services/area"; 
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_area";

async function handler(req, res) {
  try {
    const { list } = req.body;
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);

    const result = await remove(list);
    if (result.statusCode === 200) {
      return response(res, ok());
    } else {
      return response(res, result);
    }
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);