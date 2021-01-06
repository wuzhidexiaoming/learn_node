const http = require('http')
const fs = require('fs')
const spawn = require('child_process').spawn
const multiparty = require('multiparty')
const uploadPath = '../upload'
let baleFlag = false
let versionNum = 1
http.createServer((req, res) => {
  if (baleFlag) {
    res.statusCode = 500
    res.end('baleFlag is runing')
  } else {
    baleFlag = true
    if (req.method === 'POST') {
      let form = new multiparty.Form({
        uploadDir: uploadPath,
      })
      form.on('close', function () {
        baleFlag = false
        res.end('close over');
      });
      form.on('file', (name, file) => {
        fs.renameSync(file.path, `${uploadPath}/${file.originalFilename}`)
      })
      form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end('parse over');
      });
    } else {
      baleFlag = false
      res.statusCode = 405
      res.end('request method is not post')
    }
  }
}).listen(7878)
