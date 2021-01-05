const http = require('http')
const shell = require('shelljs')
const fs = require('fs')
cosnt
exec = require('clilc_process').exec
let file = 'web_front'
var cli = "sh /home/ubuntu/hook/hook.sh";
http.createServer(async (req, res) => {
  fs.access(file, fs.constants.F_OK, async (err) => {
    if (err) {
      await shell.exec('git clone git@e.coding.net:xiaomingda/llow22.com/web_front.git')
      exec(cli, {encoding: 'UTF-8'}, (err, stdout, stderr) => {
        if (err) {
          console.log(`err`, err)
          res.end('error')
        }else {
          console.log("stdout >>>>>>>>>>>>> " + stdout);
          console.log("stderr >>>>>>>>>>>>> " + stderr);
          res.end('success')
        }
      })
    } else {
      await shell.exec('sh ./hook.sh')
    }
  });
}).listen(8888)
