var db = require('./db');
var template = require('./template.js');

exports.home = function(request,response,queryData){
    db.query(`SELECT * FROM topic`, function(error,topics){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id =?`,[queryData.id],function(error2,topic){  //query문 인자에 queryData.id 값을 이어서 붙여 주지 말고, 두 번째 인자로 넣도록 하자.
         if(error2){  
           throw error2;
         }
        // console.log(topic);
         var title = topic[0].title;
         var description = topic[0].description;
         var list = template.list(topics);
         var html = template.HTML(title, list,
           `<h2>${title}</h2>${description} by ${topic[0].name}`,
           
           `<a href="/create">create</a>
           <a href="/update?id=${queryData.id}">update</a>
               <form action="delete_process" method="post">
                 <input type="hidden" name="id" value="${queryData.id}">
                 <input type="submit" value="delete">
               </form>`
         );
         response.writeHead(200);
         response.end(html);
        });

   });
}