const http = require("http");
const ming_utils = require("./ming-utils/bufferHandel");
const os  =require('os')
const fs = require("fs");
http
  .createServer((req, resq) => {
    let boundary =
      "--" + req.headers["content-type"].split(";")[1].split("=")[1];
    let arr = [];
    req.on("data", (buffer) => {
      arr.push(buffer);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(arr);
      let res = ming_utils.bufferHandel(buffer, boundary);
      // 头尾各有\r\n，去掉,之后普通类型，header与content之间有一个\r\n了，而文件类型header中还多了一个\r\n
      res.pop();
      res.shift();
      console.log(res.toString());
      res.forEach((buffer) => {
        buffer = buffer.slice(2, buffer.length - 2);
        //找到头部信息与内容之间的分割点
        let n = buffer.indexOf("\r\n\r\n");
        // 分别获取头部信息和内容
        let headerInfo = buffer.slice(0, n).toString();
        let data = buffer.slice(n + 4);
        // 如果头部信息包含\r\n则表明这个一个文件类型
        if (headerInfo.indexOf("\r\n") !== -1) {
          //文件
          let res2 = headerInfo.split("\r\n")[0].split("; ");
          let name = res2[1].split("=")[1];
          let filename = res2[2].split("=")[1];
          // 去除双引号
          name = name.substring(1, name.length - 1);
          filename = filename.substring(1, filename.length - 1);

          // 获得了文件名与对应字段名，开始写入文件
          fs.writeFile(`upload/${filename}`, data, (err) => {
            if (err) {
              console.log(err);
            } else {
              resq.write('上传成功')
              console.log("上传成功");
            }
          });
        } else {
          //普通信息
          let name = headerInfo.split("; ")[1].split("=")[1];
          name = name.substring(1, name.length - 1);
        }
      });
    });
  })
  .listen(6868);
console.log("HTTP服务已启动", `http://localhost:6868/`);

/*
 *
 * <delimiter>\r\n<header>\r\n\r\n<content>\r\n<delimter>\r\n<header>\r\n\r\n<content>
 * */
