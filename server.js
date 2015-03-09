var http = require("http");
var fs = require("fs");
var mime = require("mime");
var ejs = require("ejs");
var argv = require('yargs').argv;

function isSpecificFile(path){
  return /^\/(assets|template|css|img|modules)\/.*/.test(path);
}

function onRequest(request, response) {
  console.log("Received request: " + request.url);
    
  if(isSpecificFile(request.url)){
    fs.readFile("app/" + request.url,function(error,data){
      if(error){
        response.writeHead(404,{"Content-type":"text/plain"});
        response.end("Sorry the page was not found");
      }
      else{
        var responseCode = 200;
        var headers = {"Content-type": mime.lookup(request.url)};
        
        response.writeHead(responseCode, headers);
        response.end(data);
      }
    });
  }
  else{
    ejs.renderFile("app/index.ejs", {manifest: {'app.js': 'assets/app.js', 'dependencies.js': 'assets/dependencies.js', 'app.css': 'assets/app.css'}}, function(error,data){
      if(error){
        response.writeHead(404,{"Content-type":"text/plain"});
        response.end("Sorry the page was not found");
      }
      else{
        response.writeHead(200,{"Content-type":"text/html"});
        response.end(data);
      }
    });
  }
}

var portUsed = argv.port || 8100;
http.createServer(onRequest).listen(portUsed);
console.log("Server has started at port " + portUsed + ".");