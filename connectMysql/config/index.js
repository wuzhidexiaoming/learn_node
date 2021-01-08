const process = require("process");
if (process.env.OS === "Windows_NT") {
  module.exports = {
    ...require("./config.dev"),
  };
} else {
  module.exports = {
    ...require("./config.prod"),
  };
}
