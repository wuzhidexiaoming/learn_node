let buf1 = Buffer.from("1230045600789");
let n;
let arr = [];
while ((n = buf1.indexOf("00")) !== -1) {
  arr.push(buf1.slice(0, n));
  buf1 = buf1.slice(n + 2);
}
arr.push(buf1);
console.log(arr);
r
