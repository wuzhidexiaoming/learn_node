const http = require("http");
const fs = require("fs");
http
  .createServer((req, response) => {
    let boundary =
      "--" + req.headers["content-type"].split(";")[1].split("=")[1];
    let arr = [];
    req.on("data", (buffer) => {
      arr.push(buffer);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(arr);
      let res = bufferHandel(buffer, boundary);
      // 头尾各有\r\n，去掉,之后普通类型，header与content之间有一个\r\n了，而文件类型header中还多了一个\r\n
      res.pop();
      res.shift();
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
              response.statusCode = 500
              response.end('writerFile error')
            } else {
              response.write('上传成功,success')
              response.end()
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
const bufferHandel = function (buffer, delimiter) {
  // 创建一个数据，保存分割后的内容
  let arr = [];
  let n = 0;
  // 循环寻找分割符位置，使n=分割符位置且n!==-1
  while ((n = buffer.indexOf(delimiter)) !== -1) {
    // 每找到一个分隔符，就把分隔符前的内容添加到数组当中
    arr.push(buffer.slice(0, n));
    // 每次都修改buffer，跳过分隔符，使下一次循环直接从内容开始找下一个分隔符
    buffer = buffer.slice(n + delimiter.length);
  }
  // 将最后一个分隔符后面的内容添加到数组中
  arr.push(buffer);
  return arr;
};
/*
 *
 * <delimiter>\r\n<header>\r\n\r\n<content>\r\n<delimter>\r\n<header>\r\n\r\n<content>
 * */
