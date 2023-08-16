import pool from "./pool";
import { clientError, fail, ok, conflict } from "./httpResponses";
import fs from "fs";
import { roundTo } from "round-to";
import { addLog as addArticleLog } from "./article";
import { addLog as addSupplieLog } from "./supplie";

function generateCode() {
  const number = Math.floor(Math.random()*99999).toString().padStart(6, "0");
  return `5.1.8-${number}`;
}

async function registerArticle(description, price, purchaseId, areaId) {
  try {
    const code = generateCode();
    const result = await pool.query("INSERT INTO articles (purchase_id, area_id, code, description, price) VALUES (?,?,?,?,?)", [purchaseId, areaId, code, description, price]);
    return result.affectedRows > 0 ? result : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function add(supplierId, areaId, orderNo, orderType, orderDescription, deparmentId, articles, fileId, fileName) {
  try {
    const orderTotal = roundTo(articles.reduce((total, row) => total + (row.price * row.qty), 0), 2);
    const purchaseResult = await pool.query("INSERT INTO purchases (supplier_id, area_id, deparment_id, order_no, order_total, order_type, order_description, order_filepath, order_filename) VALUES (?,?,?,?,?,?,?,?,?)", [supplierId, areaId, deparmentId, orderNo, orderTotal, orderType, orderDescription, fileId, fileName]);
    let itemsResult = [];
    if (purchaseResult.affectedRows > 0) {
      if ( parseInt(deparmentId) === 0 ) {
        for (const article of articles) {
          const id = itemsResult.push({
            qty: article.qty,
            qtySuccess: 0,
            description: article.description
          }) - 1;
          for (let i = 0; i < article.qty; i++) {
            const result = await registerArticle(article.description, article.price, purchaseResult.insertId, 0);
            if ( result ) {
              itemsResult[id].qtySuccess++;
              await addArticleLog(result.insertId, 0, 0, 5);
            };
          }
        }
      } else if ( parseInt(deparmentId) === 1 ) {
        for (const article of articles) {
          const rows = await pool.query("SELECT * FROM supplies WHERE description=? LIMIT 1", [article.description]);
          let query = "";
          let suppieId;
          if (rows.length > 0) {
            query = "UPDATE supplies SET qty=qty+? WHERE description=? LIMIT 1";
            suppieId = rows[0].id;
          } else {
            query = "INSERT INTO supplies (qty, description) VALUES (?, ?)";
          }
          const result = await pool.query(query, [article.qty, article.description]);
          if ( result.affectedRows > 0 ) {
            suppieId = suppieId || result.insertId;
            await pool.query("INSERT INTO supplies_purchases (supplie_id, purchase_id, price, qty) VALUES(?,?,?,?)", [suppieId, purchaseResult.insertId, article.price, article.qty]);
            // await addSupplieLog(suppieId, areaId, 0);
          }
          itemsResult.push({
            success: result.affectedRows > 0,
            description: article.description
          });
        }
      }
    }
    else {
      return fail();
    }
    return ok({ itemsResult });
  } catch (err) {
    switch (err.errno) {
      case 1062:
        return conflict();
      default:
        console.log(err);
        return clientError(err);
    }
  }
}

export async function getAll() {
  try {
    const rows = await pool.query("SELECT s.name supplier_name, e.* FROM purchases e INNER JOIN suppliers s ON s.id = e.supplier_id");

    return ok({
      purchases: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function remove(list) {
  try {
    const result = await pool.query(`DELETE FROM purchases WHERE id IN (${list.join(", ")})`);

    if (result.affectedRows > 0) {
      return ok();
    }
    else {
      return notFound();
    }
  } catch (err) {
    return clientError(err);
  }
}

export async function saveFile(file, id) {
  try {
    const ext = file.originalFilename.split('.').pop();
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/uploads/${id}.${ext}`, data);
    await fs.unlinkSync(file.filepath);
    return ok();
  } catch (err) {
    return clientError(err);
  }
}

export async function deleteFile(fileName) {
  try {
    await fs.unlinkSync(`./public/uploads/${fileName}`);
    return ok();
  } catch (err) {
    return clientError(err);
  }
}