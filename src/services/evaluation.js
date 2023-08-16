import pool from "./pool";
import { clientError, fail, ok } from "./httpResponses";

export async function add(userId, supplierId, requestDate, responseDate, orderDate, dateReceived) {
  try {
    const result = await pool.query("INSERT INTO evaluations (user_id, supplier_id, request_date, response_date, order_date, date_received) VALUES (?,?,?,?,?,?)", [userId, supplierId, requestDate, responseDate, orderDate, dateReceived]);

    if (result.affectedRows > 0) {
      return ok();
    }
    else {
      return fail();
    }
  } catch (err) {
    return clientError(err);
  }
}


export async function getAll() {
  try {
    const rows = await pool.query("SELECT u.name user_name, s.name supplier_name, e.* FROM evaluations e\
      INNER JOIN suppliers s ON s.id = e.supplier_id\
      INNER JOIN users u ON u.id = e.user_id");

    return ok({
      evaluations: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function remove(list) {
  try {
    const result = await pool.query(`DELETE FROM evaluations WHERE id IN (${list.join(", ")})`);

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
