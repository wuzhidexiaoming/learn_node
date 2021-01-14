const http = require("http");
const fetch = require("node-fetch");
const process = require("process");
console.log(process.env.DOMAIN);
http
  .createServer((req, res) => {
    fetch("https://apiv3.shanbay.com/weapps/dailyquote/quote/?date=2019-06-30")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        res.end(json);
      });
  })
  .listen(7979);
