import formidable from "formidable";
import response from "@/services/response";
import { v4 as uuid } from "uuid";
import { add, saveFile, deleteFile } from "@/services/purchase";
import { check } from "@/services/permission";
import { clientError, ok } from "@/services/httpResponses";
import { withSessionRoute } from "@/lib/withSession";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ns = {
  form_parse: async (req, form) => await new Promise((resolve, reject) => form.parse(req, (e, fields, files) => e ? reject(e) : resolve([fields, files])))
}

const permission = "add_area";

async function handler(req, res) {
  try {
    const [havePermission, httpRes] = check(req, permission);
    if (!havePermission) return response(res, httpRes);
    let fileId = "";
    let fileName = "";
    const form = new formidable.IncomingForm();
    const [fields, files] = await ns.form_parse(req, form);
    if (files.file) {
      const ext = files.file.originalFilename.split('.').pop();
      const id = uuid();
      fileId = `${id}.${ext}`;
      fileName = files.file.originalFilename;
      const result = await saveFile(files.file, id);
      if (result.statusCode !== 200) {
        return response(res, result);
      }
    }

    const {
      supplierId,
      areaId,
      orderNo,
      orderType,
      orderDescription,
      deparmentId,
      articles,
    } = fields;

    const result = await add(supplierId, areaId, orderNo, orderType, orderDescription, deparmentId, JSON.parse(articles), fileId, fileName );
    if (result.statusCode === 200) {
      return response(res, ok());
    } else {
      deleteFile(fileId);
      return response(res, result);
    };
  } catch (err) {
    console.log(err);
    return response(res, clientError(err));
  }
}

export default withSessionRoute(handler);