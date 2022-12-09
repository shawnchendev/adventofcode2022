const { readFileSync } = require("fs");

module.exports.syncReadFile = function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};
