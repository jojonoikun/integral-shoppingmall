/*
 * @Author: JOJOcode
 * @Date: 2022-12-07 16:35:01
 * @LastEditTime: 2022-12-07 16:41:21
 * @FilePath: \server\backstage\js\mysqlconnection.js
 */

var mysql = require("mysql");
var mysql_config = {
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "mimall",
  port: 3306,
  // 允许在一个查询中使用多个语句。当开启这个选项时，你可以将多个SQL语句串联起来，然后一次性执行它们。
  multipleStatements: true,
  // connectionLimit: 10,
  acquireTimeout: 3000000,
};

// function handleDisconnection() {
//   var connection = mysql.createConnection(mysql_config);
//   connection.connect(function (err) {
//     if (err) {
//       setTimeout("handleDisconnection()", 2000);
//     }
//   });

//   connection.on("error", function (err) {
//     logger.error("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       logger.error("db error执行重连:" + err.message);
//       handleDisconnection();
//     } else {
//       throw err;
//     }
//   });
//   exports.connection = connection;
// }

// exports.handleDisconnection = handleDisconnection;

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(mysql_config);

  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to MySQL: ", err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("Connected to MySQL");
  });

  connection.on("error", function (err) {
    console.error("MySQL error: ", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
