import pool from "./pool";
import { clientError, ok, conflict } from "./httpResponses";

export async function set(supplieId, areaId, qty) {
  try {
    const supplie = (await pool.query("SELECT * FROM supplies WHERE id=? LIMIT 1", [supplieId]))[0];
    if ( qty > supplie.qty ) { return conflict() };

    const success = await addLog(supplieId, areaId, qty, 0);
    if ( !success ) { return clientError() };
    
    const result = await pool.query("UPDATE supplies SET qty=qty-? WHERE id=? LIMIT 1", [qty, supplieId]);
    if ( result.affectedRows === 0 ) { return clientError() };

    return ok();
  } catch (err) {
    console.log(err);
    return clientError(err);
  }
}

export async function getAll(supplieId) {
  try {
    if ( supplieId ) {
      const rows = await pool.query("SELECT * FROM supplies WHERE supplie_id=?", [supplieId]);
      return ok({
        supplies: rows
      });
    }
    else {
      const rows = await pool.query("SELECT * FROM supplies");
      return ok({
        supplies: rows
      });
    }
  } catch (err) {
    return clientError(err);
  }
}

export async function getBetween(startDate, endDate) {
  try {
    const rows = await pool.query("SELECT s.description supplie_description, a.name area_name, sm.* FROM supplies_movements sm\
    INNER JOIN supplies s ON sm.supplie_id = s.id\
    INNER JOIN areas a ON sm.area_id = a.id\
    WHERE sm.movement_date BETWEEN ? AND ?\
    ORDER BY sm.movement_date ASC", [startDate, endDate]);
    return ok({
      supplies: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getBetweenByArea(startDate, endDate, areaId) {
  try {
    const rows = await pool.query("SELECT s.description supplie_description, a.name area_name, sm.* FROM supplies_movements sm\
    INNER JOIN supplies s ON sm.supplie_id = s.id\
    INNER JOIN areas a ON sm.area_id = a.id\
    WHERE sm.area_id=? AND sm.movement_date BETWEEN ? AND ?\
    ORDER BY sm.movement_date ASC", [areaId, startDate, endDate]);
    return ok({
      supplies: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getBetweenBySupplie(startDate, endDate, supplieId) {
  try {
    const rows = await pool.query("SELECT s.description supplie_description, a.name area_name, sm.* FROM supplies_movements sm\
    INNER JOIN supplies s ON sm.supplie_id = s.id\
    INNER JOIN areas a ON sm.area_id = a.id\
    WHERE sm.supplie_id=? AND sm.movement_date BETWEEN ? AND ?\
    ORDER BY sm.movement_date ASC", [supplieId, startDate, endDate]);
    return ok({
      supplies: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getAllPurchases(supplieId) {
  try {
    if ( supplieId ) {
      const rows = await pool.query("SELECT s.description supplie_description, sp.* FROM supplies_purchases sp\
      INNER JOIN supplies s ON sp.supplie_id = s.id\
      WHERE sp.supplie_id=?", [supplieId]);
      return ok({
        purchases: rows
      });
    }
    else {
      const rows = await pool.query("SELECT s.description supplie_description, sp.* FROM supplies_purchases sp\
      INNER JOIN supplies s ON sp.supplie_id = s.id");
      return ok({
        purchases: rows
      });
    }
  } catch (err) {
    return clientError(err);
  }
}

export async function getPurchasesBetween(startDate, endDate, supplieId) {
  try {
    if (supplieId) {
      const rows = await pool.query("SELECT s.description supplie_description, sp.* FROM supplies_purchases sp\
      INNER JOIN supplies s ON sp.supplie_id = s.id\
      WHERE sp.supplie_id=? AND sp.movement_date BETWEEN ? AND ?\
      ORDER BY sp.movement_date ASC", [supplieId, startDate, endDate]);
      return ok({
        purchases: rows
      });
    }
    else {
      const rows = await pool.query("SELECT s.description supplie_description, sp.* FROM supplies_purchases sp\
      INNER JOIN supplies s ON sp.supplie_id = s.id\
      WHERE sp.movement_date BETWEEN ? AND ?\
      ORDER BY sp.movement_date ASC", [startDate, endDate]);
      return ok({
        purchases: rows
      });
    }
  } catch (err) {
    return clientError(err);
  }
}

export async function addLog(supplieId, areaId, qty, movement) {
  try {
    const result = await pool.query("INSERT INTO supplies_movements (supplie_id, area_id, qty, movement) VALUES (?,?,?,?)", [supplieId, areaId, qty, movement]);
    return result.affectedRows > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
}