const http = require("http");
const fs = require("fs");
const path = require("path");

const server = new http.createServer((req, res) => {
  const { url, method } = req;
  fs.readFile(path.resolve(__dirname, "./test.json"), (err, data) => {
    // console.log(url);
    // console.log(method);
    console.log(__dirname);
    console.log(err);
    if (url === "/nihao") {
      res.end(data);
    }
  });
});
server.listen(3222);
