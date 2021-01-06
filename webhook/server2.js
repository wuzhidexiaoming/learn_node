const http = require('http')
const callfile = require('child_process');
http.createServer((req, res) => {
// 做一些关于安全的判断 此处省略
  console.log('http')
  callfile.execFile('run.sh', [], null, function (err, stdout, stderr) {
    console.log('test')
  });
}).listen(8787)
