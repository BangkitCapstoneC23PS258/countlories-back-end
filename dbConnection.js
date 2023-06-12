const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "34.128.117.96", // HOST NAME
    user: "root", // USER NAME
    database: "countlories", // DATABASE NAME
    password: "bluered123", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;