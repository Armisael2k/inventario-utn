import response from "@/services/response";
import { getBetweenByArea } from "@/services/supplie"; 
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

const permission = "add_supplier";

async function handler(req, res) {
  try {
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);

    const {
      startDate,
      endDate,
      areaId
    } = req.query;

    const result = await getBetweenByArea(startDate, endDate, areaId);
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