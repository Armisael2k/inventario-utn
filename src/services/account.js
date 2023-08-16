import pool from "./pool";
import { clientError, notFound, ok, conflict } from "./httpResponses";
import bcrypt from "bcryptjs";

const defaultPermissons = { //Permisos provicionales
  add_supplier: true,
  add_area: true,
};

export async function add(name, username, password) {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await pool.query("INSERT INTO users (name,username,password) VALUES(?,?,?)", [name, username, hashedPassword]);
    if ( result.affectedRows > 0 ) {
      return ok();
    } 
    return clientError();
  } catch (err) {
    switch (err.errno) {
      case 1062:
        return conflict();
      default:
        return clientError(err);
    }
  }
}

export async function get(username) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
    if ( !result[0] )
      return notFound();
    else
      return ok({
        account: result[0]
      });
  } catch (err) {
    return clientError(err);
  }
}

export async function auth(username, password) {
  try {
    const result = await get(username);
    if ( result.statusCode !== 200 )
      return result;
    else if ( await bcrypt.compare(password, result.body.account.password) )
      return ok({
        account: {...result.body.account, permissions: defaultPermissons} //Permisos provicionales
      });
    else
      return notFound();
  } catch (err) {
    console.log(err.message);
    return clientError(err);
  }
}

export async function getAll() {
  try {
    const rows = await pool.query("SELECT * FROM users");

    return ok({
      users: rows
    });
  } catch (err) {
    return clientError(err);
  }
}
