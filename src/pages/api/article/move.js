import response from "@/services/response";
import { move } from "@/services/article"; 
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_supplier";

async function handler(req, res) {
  try {
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);

    const { 
      articleId,
      startAreaId,
      endAreaId,
    } = req.body;

    const result = await move(articleId, startAreaId, endAreaId);
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