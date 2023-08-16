import response from "@/services/response";
import { edit } from "@/services/supplier";
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_supplier";

async function handler(req, res) {
  try {
    const { id, row } = req.body;
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);
    
    const result = await edit(id, row);
    if (result.statusCode === 200) {
      return response(res, ok());
    } else {
      return response(res, result);
    };
  } catch (err) {
    console.log(err.message);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);