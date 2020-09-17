const oss = require("ali-oss");
/*用户登录名称 xiaoming@1822882455789150.onaliyun.com
AccessKey ID LTAI4G68JVYptuns5j6Zyywd
AccessKey Secret BGgMU5T8MCSezmOGkWlFB1Bw7RFuZ9*/

const client = oss({
  accessKeyId: "LTAI4GJgM5Wk139cLTS1iTnw",
  accessKeySecret: "iPph8fMpXzTRJ3a19d2LSkmuCWCtAZ",
  bucket: "learn-node-oss",
  region: "oss-cn-beijing",
});
// console.log(store)
async function listBuckets() {
  try {
    let result = await client.listBuckets();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

listBuckets().then((r) => {
  console.log(r);
});
client.useBucket("Your bucket name");
async function list() {
  try {
    let result = await client.list({
      "max-keys": 5,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
list();
