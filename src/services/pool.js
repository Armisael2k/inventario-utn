import mysql from "serverless-mysql";

const pool = mysql({
  config: {
    host: "sql973.main-hosting.eu",
    user: "u359106124_admin",
    password: "=K6n:1#d",
    port: 3306,
    database: "u359106124_utn_inventario",
  },
});

export default pool;
