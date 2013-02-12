var fs = require('fs');

var express = require('express');

var app = express();

var server = app.listen(8080);

app.get('/', function(req, response){
  fs.readFile(__dirname+'/helloworld.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(data);
    response.end();
  });
});

app.use('/static', express.static(__dirname + '/static'));

var nowjs = require("now");
var everyone = nowjs.initialize(server);



nowjs.on("connect", function(){
  console.log("Joined: " + this.now.name);
});

nowjs.on("disconnect", function(){
  console.log("Left: " + this.now.name);
  everyone.now.receiveSignOff(this.now.name);
});

everyone.now.sendSignOn = function(onoff, group){
  everyone.now.receiveSignOn(onoff, this.now.group);
};

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, this.now.group, message);
};
