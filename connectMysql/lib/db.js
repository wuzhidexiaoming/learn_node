const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "787878",
  database: "learn",
});
db.connect();
module.exports = db;
