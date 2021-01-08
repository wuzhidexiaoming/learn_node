const { addRoute, findRoute } = require("./route/route");
const http = require("./lib/http");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "787878",
  database: "learn",
});
db.connect();

addRoute("get", "/list", (res, params, data, file) => {
  db.query("SELECT * FROM goods", function (error, results, fields) {
    if (error) throw error;
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(results));
  });
});

addRoute("post", "/add", (res, params, data, file) => {
  let { goodsname, price, count } = data;
  db.query(
    "INSERT INTO goods (goodsname, price, count) VALUES(?,?,?)",
    [goodsname, price, count],
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "text/json");
      res.end(JSON.stringify(results));
    }
  );
});
