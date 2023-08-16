import pool from "./pool";
import { clientError, ok, conflict } from "./httpResponses";

export async function set(articleId, areaId) {
  try {
    const article = (await pool.query("SELECT * FROM articles WHERE id=? LIMIT 1", [articleId]))[0];
    if ( article.area_id !== 0 ) { return conflict() };

    const success = addLog(articleId, 0, areaId, 0);
    if ( !success ) { return clientError() };

    const result = await pool.query("UPDATE articles SET area_id=? WHERE id=? LIMIT 1", [areaId, articleId]);
    if ( result.affectedRows === 0 ) { return clientError() };

    return ok();
  } catch (err) {
    console.log(err);
    return clientError(err);
  }
}

export async function move(articleId, startAreaId, endAreaId) {
  try {
    const article = (await pool.query("SELECT * FROM articles WHERE id=? LIMIT 1", [articleId]))[0];
    if ( article.area_id !== startAreaId ) { return conflict() };

    const success = addLog(articleId, startAreaId, endAreaId, 2);
    if ( !success ) { return clientError() };

    const result = await pool.query("UPDATE articles SET area_id=? WHERE id=? LIMIT 1", [endAreaId, articleId]);
    if ( result.affectedRows === 0 ) { return clientError() };

    return ok();
  } catch (err) {
    console.log(err);
    return clientError(err);
  }
}

export async function getAll() {
  try {
    const rows = await pool.query("SELECT ar.name area_name, s.id supplier_id, s.name supplier_name, p.purchase_date, a.* FROM articles a\
    INNER JOIN purchases p ON a.purchase_id = p.id\
    INNER JOIN areas ar ON a.area_id = ar.id\
    INNER JOIN suppliers s ON p.supplier_id = s.id\
    ORDER BY id ASC");

    return ok({
      articles: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getAllByArea(areaId) {
  try {
    const rows = await pool.query("SELECT ar.name area_name, s.id supplier_id, s.name supplier_name, p.purchase_date, a.* FROM articles a\
    INNER JOIN purchases p ON a.purchase_id = p.id\
    INNER JOIN areas ar ON a.area_id = ar.id\
    INNER JOIN suppliers s ON p.supplier_id = s.id\
    WHERE a.area_id=?\
    ORDER BY id ASC", [areaId]);

    return ok({
      articles: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getBetween(startDate, endDate) {
  try {
    const rows = await pool.query("SELECT ar.name area_name, s.id supplier_id, s.name supplier_name, p.purchase_date, a.* FROM articles a\
    INNER JOIN purchases p ON a.purchase_id = p.id\
    INNER JOIN areas ar ON a.area_id = ar.id\
    INNER JOIN suppliers s ON p.supplier_id = s.id\
    WHERE p.purchase_date BETWEEN ? AND ?\
    ORDER BY id DESC", [startDate, endDate]);
    
    return ok({
      articles: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function getMovementsByArea(areaId) {
  try {
    const rows = await pool.query("SELECT a.description article_description, a.code, ar.name start_area_name, ar2.name end_area_name, am.* FROM articles_movements am\
    INNER JOIN articles a ON am.article_id = a.id\
    INNER JOIN areas ar ON am.area_start_id = ar.id\
    INNER JOIN areas ar2 ON am.area_end_id = ar2.id\
    WHERE am.area_start_id=? OR am.area_end_id=?\
    ORDER BY id ASC", [areaId, areaId]);
    
    return ok({
      articles: rows
    });
  } catch (err) {
    return clientError(err);
  }
}

export async function addLog(articleId, startAreaId, endAreaId, movement) {
  try {
    const result = await pool.query("INSERT INTO articles_movements (article_id, area_start_id, area_end_id, movement) VALUES (?,?,?,?)", [articleId, startAreaId, endAreaId, movement]);
    return result.affectedRows > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
}