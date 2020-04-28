const http = require("http");
const fs = require("fs");
const url = require("url");
http
  .createServer(function (req, res) {
    let tempPath = url.parse(req.url).path
    fs.readFile(`static/${tempPath}`, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("NOT FOUND");
        res.end();
      } else {
        res.writeHead(200);
        res.write(data);
        res.end();
      }
    });
  })
  .listen(6262);
