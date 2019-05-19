var db = require('./db');
var template = require('./template.js');

exports.update = function(request,response,queryData){
db.query(`SELECT * FROM topic`, function(error,topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],function(error2,topic){  //query문 인자에 queryData.id 값을 이어서 붙여 주지 말고, 두 번째 인자로 넣도록 하자.
     if(error2){  
       throw error2;
     }
     db.query(`SELECT * FROM author`, function(error2,authors){
      var list = template.list(topics);
      var html = template.HTML(topic[0], list,
       `
       <form action="/update_process" method="post">
         <input type="hidden" name="id" value="${topic[0].id}">
         <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
         <p>
           <textarea name="description" placeholder="description">${topic[0].description}</textarea>
         </p>
         <p>
            ${template.authorSelect(authors, topic[0].author_id)}
           <input type="submit">
         </p>
       </form>
       `,
       `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
      );
      response.writeHead(200);
      response.end(html);
     });
   
    });
});
}

exports.update_process = function(){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(`UPDATE topic SET title = ?, description = ?,author_id = ? WHERE id=?`
              ,[post.title,post.description,post.author,post.id],                 
                function(error,result){
                    if(error){
                      throw error;
                    }
                    response.writeHead(302, {Location: `/?id=${post.id}`});
                    response.end();
                })       
  });

}