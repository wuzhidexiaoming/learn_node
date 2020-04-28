const fs = require("fs");
fs.readFile("./static/test.js", (error, data) => {
  let arr = [];
  let n;
  if ((n = data.indexOf("  ")) !== -1) {
    arr.push(data.slice(0, n));
    data = data.slice(n + 2);
  }
  arr.push(data);
  console.log(arr.join('    '));
});
