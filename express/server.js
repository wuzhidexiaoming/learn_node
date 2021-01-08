const Express = require('express')
const fs = require('fs')
const multer = require('multer')
const app = new Express()
const upload = multer({dest: `${__dirname}/upload`})
const os = require('os')
const port = 8989
app.post('/upload', upload.any(), ((req, res, next) => {
  console.log(req.files)
  res.end('success')
  next()
}))

app.get('/', (req, res, next) => {
  res.end('test')
})
app.listen(port, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`服务启动成功 http://${Object.entries(os.networkInterfaces())[0][1][1].address}:${port}`)
  }
})
