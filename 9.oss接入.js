const http = require('http')
const fs = require('fs')
const path = require('path')
const got = require('got');
const createError = require('http-errors')

async function handleGotBaidu() {
  return got.post('http://192.168.8.168:8084/enterpriseSetting/sendMsg');
}

const server = http.createServer((async (req, res) => {
  try {
    let result = await handleGotBaidu()
    console.log(result)
    res.write(JSON.stringify(result))
    res.end()
  } catch (e) {
    console.log(createError(404, `${404}`))
    console.log()
    res.write(`${e}`)
    res.end()
  }

}))
server.listen(8787)
