var express = require("express");
var server  = express();

var config  = require("./server/config");

var port    = config.server.port;
var host    = config.server.host;

//
server.use("/", express.static(__dirname + "/client"));

server.listen(config.server.port, config.server.host, function(){
    console.log("port listening on " + config.server.host + ":" + config.server.port)
});

