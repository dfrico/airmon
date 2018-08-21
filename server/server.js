const http = require('http');
const HttpDispatcher = require('httpdispatcher');
const fs = require('fs');

const PORT=3000;

let dispatcher = new HttpDispatcher();

function handleRequest(request, response){
	try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
	console.log("Working on http://localhost:%s 🚀", PORT);
});

dispatcher.setStatic('resources');

dispatcher.onDataPost = function(route, dataHandler) {
	dispatcher.onPost(route, dataDispatch(dataHandler));
}

dispatcher.onDataGet = function(route, dataHandler) {
    dispatcher.onGet(route, dataDispatch(dataHandler));
}

dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});

dispatcher.onPost("/", function(req, res){
	console.log(req.body);
  console.log(req.headers);
  res.writeHead(200, {'Content-Type': 'application/json'});

	res.end(JSON.stringify(req.body));
	return 0;
})
