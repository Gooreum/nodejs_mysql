var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var topics = require('./lib/topics');
var create = require('./lib/create');
var update = require('./lib/update');
var del = require('./lib/delete');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        topic.home(request, response);
      } else {
        topics.home(request,response,queryData);
      }
    } else if(pathname === '/create'){
        create.create(request,response);
    } else if(pathname === '/create_process'){
        create.create_process(request,response);     
    } else if(pathname === '/update'){
        update.update(request,response,queryData);
    } else if(pathname === '/update_process'){
        update.update_process(request,response);
    } else if(pathname === '/delete_process'){
        del.delete_process(request,response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
