var mysql = require('mysql'); //mysql 모듈을 사용하겠다. 
var connection = mysql.createConnection({  
    host : 'localhost',
    user : 'root',
    password : 'mingu5561846',
    database : 'opentutorials'
});

connection.connect();

connection.query('SELECT * FROM topic ', function(error,results,fields){
    if(error){
        console.log(error);
    }
    console.log(results);
});

connection.end();