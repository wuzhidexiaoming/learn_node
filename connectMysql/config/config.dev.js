const path = require("path");
module.exports = {
  //database
  DB_HOST: "localhost",
  DB_PORT: 3306,
  DB_USER: "root",
  DB_PASS: "787878",
  DB_NAME: "learn",

  //http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, "../static/"),
  HTTP_UPLOAD: path.resolve(__dirname, "../static/upload/"),
};
