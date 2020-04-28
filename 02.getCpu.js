const os = require("os");
const mem = (os.freemem() / os.totalmem()) * 100;
console.log(os.freemem());
console.log(os.totalmem());
console.log(`内存使用率：${mem.toFixed()}%`);
