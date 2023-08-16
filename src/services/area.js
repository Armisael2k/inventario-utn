import pool from "./pool";
import { clientError, conflict, notFound, ok } from "./httpResponses";

export async function add(name) {
  try {
    const result = await pool.query("INSERT INTO areas (name) VALUES (?)", [name]);

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
        return clientError(err);
    }
  }
}

export async function getAll(includeFirst) {
  try {
    let query;
    if ( includeFirst === "true" ){
      query = "SELECT * FROM areas ORDER BY id ASC";
    } else {
      query = "SELECT * FROM areas WHERE id > 0 ORDER BY id ASC";
    }
    const rows = await pool.query(query);

    return ok({
      areas: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function remove(list) {
  try {
    const result = await pool.query(`DELETE FROM areas WHERE id IN (${list.join(", ")})`);

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
    const result = await pool.query(`UPDATE areas SET ${newValues} WHERE id = ?`, [id]);
    
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