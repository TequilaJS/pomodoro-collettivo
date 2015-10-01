/**
*		Pomodoro collettivo
*		server/Modles/TaskSchema.js
*
*		DB schema for tasks - mongoose based
*/
"use strict";

var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var TaskSchema = new Schema({
    title: String,
    description: String,
	assigneeId: Number,
    pomodoroTicks: Number,
	status: Number
});

//Export schema so it can be used where it is needed
module.exports 	= mongoose.model('Task', TaskSchema);