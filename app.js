const { copySupperSync } = require("./dist/index");
const path = require("path");

copySupperSync(
  path.resolve(__dirname, "../endd-api"),
  path.resolve(__dirname, "../../../../.endd-api")
);