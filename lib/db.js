var mysql = require('mysql');

var db = mysql.createConnection({  
    host : 'localhost',
    user : 'root',
    password : 'mingu5561846',
    database : 'opentutorials'
  });
  db.connect(); //실제 디비 접속이 일어남.

  module.exports = db;
