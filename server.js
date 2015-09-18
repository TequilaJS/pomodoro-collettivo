/**
*		Pomodoro colletivo
*		server.js
*
*		Server initialization file, from here we configure and start our server process
*/
"use strict";

// init express and server instance
var express = require( "express" ),
	server  = express();

// middleware dependencies
var bodyParser 	= require( "body-parser" );
var mongoose 	= require( "mongoose" );
var morgan		= require( "morgan" );

// other init params
var cors		= require("./server/cors");
var config  = require("./server/config");

// config and init of middleware modules
mongoose.connect(config.database.url + config.database.collection);
server.use( bodyParser.urlencoded( { extended : true } ) );
server.use( bodyParser.json() );
server.use( morgan("dev") );
server.use( cors );

// calling api and defining static served content

server.use( "/", express.static ( __dirname + "/client" ) );

// telling our server to listen on the specified ports
server.listen ( config.server.port, config.server.host, function(){
    console.log ( "port listening on " + config.server.host + ":" + config.server.port )
});