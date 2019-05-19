var db = require('./db');
var qs = require('querystring');

exports.delete_process = function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
      db.query(`DELETE FROM topic WHERE id=?`
              ,[post.id], function(error,result){
                    if(error){
                      throw error;
                    }
                    response.writeHead(302, {Location: `/`});
                    response.end();
                }); 
    });
}