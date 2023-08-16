import response from "@/services/response";
import { add } from "@/services/area"; 
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_area";

async function handler(req, res) {
  try {
    const { name } = req.body;
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);
      
    const result = await add(name);
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