var db = require('./db');
var template = require('./template.js');

exports.create = function(request,response){
db.query(`SELECT * FROM topic`, function(error,topics){
    db.query(`SELECT * FROM author`, function(error2,authors){
      console.log(authors);
   
      var title = 'Create';        
      var list = template.list(topics);
      var html = template.HTML(title, list,
          `
          <form action="/create_process" method="post">
           <p><input type="text" name="title" placeholder="title"></p>
           <p>
             <textarea name="description" placeholder="description"></textarea>
           </p>
           <p>
            ${template.authorSelect(authors)}
           <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a>`
      );
      response.writeHead(200);
      response.end(html);
    });

});
}

exports.create_process = function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });      
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO topic(title,description,created,author_id) VALUES(?, ?, NOW(), ?)`,
                  [post.title, post.description,post.author],
                  function(error,result){
                      if(error){
                        throw error;
                      }
                      response.writeHead(302, {Location: `/?id=${result.insertId}`});
                      response.end();
                  }
        )

    });
}