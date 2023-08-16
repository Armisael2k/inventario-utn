import pool from "./pool";
import { clientError, conflict, notFound, ok, fail } from "./httpResponses";

export async function add(name) {
  try {
    const result = await pool.query("INSERT INTO suppliers (name) VALUES (?)", [name]);

    if (result.affectedRows > 0){
      return ok();
    }
    else {
      return fail();
    }
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
    const rows = await pool.query("SELECT * FROM suppliers ORDER BY id ASC");

    return ok({
      suppliers: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function remove(list) {
  try {
    const result = await pool.query(`DELETE FROM suppliers WHERE id IN (${list.join(", ")})`);

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

export async function edit(id, row) {
  try {
    const newValues = Object.keys(row).map(key => `${key} = "${row[key]}"`).join(", ");
    const result = await pool.query(`UPDATE suppliers SET ${newValues} WHERE id = ?`, [id]);
    
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