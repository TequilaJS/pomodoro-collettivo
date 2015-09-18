/**
*		Pomodoro colletivo
*		server/config.js
*
*		Expose some configuration parameters in a separate module
*/
"use strict";

module.exports = {
	
	// server configuration params
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || "0.0.0.0"
    },
	
	// database configuration params
	database: {
		url: "mongodb://127.0.0.1:27017/",
		collection: "pomodoro-colletivo-db"
	}
	
};