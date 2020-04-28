const http = require("http");
const url = require("url");
const queryString = require("querystring");
const fs = require("fs");
let users = {};
/*
 * 不同请求，就是获取请求参数的方式不一样么处理逻辑是一样的
 * */
http
  .createServer(function (req, res) {
    // get和post分别是请求附带的参数，因为两者参数存放位置不同，所以提取方式也不同，而path就是请求路径，不带参数的路径（？之前的路径）
    let path = "",
      get = {},
      post = {};
    if (req.method === "GET") {
      let { pathname, query } = url.parse(req.url, true);
      path = pathname;
      get = query;
      complete();
    } else if (req.method === "POST") {
      path = req.url;
      let arr = [];
      // TODO:form表单以post请求传输时，就会一直处于pending状态
      req.on("data", (buffer) => {
        arr.push(buffer);
      });
      res.on("end", () => {
        console.log('没执行')
        let buffer = Buffer.concat(arr);
        post = queryString.parse(buffer.toString());
        complete();
      });
    }
    function complete() {
      if (path === "/reg") {
        let { username, password } = get;
        if (users[username]) {
          res.write("Username already exists");
          setTimeout(()=>{
          })
          res.end();
        } else {
          users[username]=password
          res.write("register succesed");
          res.end();
        }
      } else if (path === "/login") {
        let {username,password}=post
        console.log(username,password)
        if (!users[username]){
          res.write("user not cunzai");
          res.end();
        }else if (users[username]!==password){
          res.write("password budui");
          res.end();
        }else {
          res.write("login success");
          res.end();
        }

      } else {
        fs.readFile(`static${path}`, function (error, buffer) {
          if (error) {
            res.writeHead(404);
            res.write("Not Found");
            res.end();
          } else {
            res.write(buffer);
            res.end();
          }
        });
      }
    }
  })
  .listen(5353);
console.log("HTTP服务已启动", `http://127.0.0.1:5353/test.html`);
