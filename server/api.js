/**
*		Pomodoro collettivo
*		server/api.js
*
*		Configuration file for the REST api
*/
"use strict";

var express	= require("express");
var Task	= require("./Models/TaskSchema");

module.exports = function(app){
    var router = express.Router();
    
    // adding alert middleware to let us know requests are happening
    router.use(function(req,res,next){       
        console.log('Something is happening in our API');
		next();
    });
    
    // Defining the tasks api
	
	router.route("/tasks")
	
		.get(function(req, res){
        	Task.find(function(error, tasks){
            	if (error) {
                	res.send("Resource not allowed");
            	}
            	res.json(tasks);
        	})
		})
	
	//insert a task to the database
		.post(function(req,res){
			var task = new Task;

			task.title 			= req.body.title;
			task.description 	= req.body.description;
			task.assigneeId 	= req.body.assigneeId;
			task.pomodoroTicks 	= req.body.pomodoroTicks;
			task.status 		= req.body.status;
			
			task.save( function ( error ) {
				if ( error ) {
					res.send ( 'Resource not allowed' )
				}
				Task.find(function(err, tasks){
					if (err) res.send(err);
					res.json(tasks);
				})
			});        
		});

	/**
	 * /task/:task_id
	 */
	router.route( "/task/:task_id" )
		// get a single task by id
		.get(function(req,res) {
			Task.findById(req.params.task_id, function(err, task){
				if (err) res.send(err);
				res.json(task);
			})
		})
		
		// update a task by id
		.put(function(req,res){
			Task.findById(req.params.task_id, function(err, task){
				if (err) res.send(err);

				task.title = req.body.title;
				task.description = req.body.description;
				task.assingeeId = req.body.assingeeId;
				task.pomodoroTicks = req.body.pomodoroTicks;
				task.status = req.body.status;
				
				task.save(function(err){
					if (err) res.send(err);
					
					Task.find(function(err, tasks){
						if (err) res.send(err);
						res.json(tasks);
					})
				})
			});
		})
		
		.delete(function(req,res){
			Task.remove({
				_id : req.params.task_id
			}, function(err,task){
				if (err) res.send(err);
				
				Task.find(function(err, tasks){
					if (err) res.send(err);
					res.json(tasks);
				})
			})
		})
	app.use('/api', router);

}