/**
*		Pomodoro collettivo
*		server/cors.js
*
*		Define and implement CORS policy on server request headers
*/
"use strict";

module.exports = function(req, res, next) {
    var valid = {
        local:"http://localhost:3000",
        all: "*"
    };

    res.header("Access-Control-Allow-Origin", valid.all);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
};