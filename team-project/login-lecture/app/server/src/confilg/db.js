const mysql = require("mysql");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "778800",
    database:"escape",
    port: '3306',
// 환경변수 

});



db.connect();

// db.query('SELECT * from Users', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
// });

// db.end();
module.exports = db;

