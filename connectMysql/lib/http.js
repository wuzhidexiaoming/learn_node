const http = require("http");
const { HTTP_PORT, HTTP_ROOT } = require("../config");
const querystring = require("querystring");
const { findRoute } = require("../route/route");
http
  .createServer((req, res) => {
    if (req.method === "POST") {
    } else {
      // get请求
      let url = new URL(req.url, "http://localhost");
      let params = querystring.parse(url.search.slice(1));
      handle({
        method: req.method,
        url: url.pathname,
        res,
        params,
        data: {},
        file: {},
      });
    }
  })
  .listen(HTTP_PORT, (err) => {
    if (err) console.log("error");
    console.log(`服务已启动 http://localhost:${HTTP_PORT}`);
  });

function handle({ method, url, res, params, data, file }) {
  let fn = findRoute(method, url);
  if (fn) {
    fn(res, params, data, file);
  } else {
    res.statusCode = 404;
    res.end("not found");
  }
}
