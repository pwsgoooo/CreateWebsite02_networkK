// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "root",
//   database: "calender",
// });

// connection.connect();

// connection.query("SELECT * FROM todo", function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });

// connection.end();

// module.exports = {
//   init: function () {
//     return mysql.createConnection(dbInfo);
//   },
//   connect: function (conn) {
//     conn.connect(function (err) {
//       if (err) console.error("mysql 연결 에러 : " + err);
//       else console.log("mysql 연결 성공");
//     });
//   },
// };

// // nodejs/mysql.js (비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 함)
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   port     : 3307,  // MariaDB가 3306을 사용, MySQL이 3307 포트 사용
//   user     : 'root',
//   password : '111111',
//   database : 'opentutorials'
// });

// connection.connect();

// connection.query('SELECT * FROM topic', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });

// connection.end();
