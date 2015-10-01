(function(){
	"use strict";
	
	angular
		.module("pomodoro")
		.factory("TaskService", TaskService);
	
	TaskService.$inject = ['$http'];
	
	function TaskService($http) {
		
		var apiUrl = "/api/";
		
		var TaskProvider = function(){};
		
		TaskProvider.prototype.getTasks = function(){
				return function(){
					$http.get(apiUrl+"tasks")						
				}				
		}
		
		TaskProvider.prototype.getTaskById = function(id){
			var task = {};			
			$http({
				method: "GET",
				url: apiUrl+"tasks/"+id
			}).then(
				function success (res) {
				task = res.data;
			}, 
				function error (res){
				console.log(res);
			});		
			return task;
		}
		
		TaskProvider.prototype.deleteTask = function(id){
			var tasks = [];
			$http({
				method: "DELETE",
				url: apiUrl+"task/"+id
			}).then(
				function success (res) {
				tasks = res.data;
			}, 
				function error (res){
				console.log(res);
			});
			
			return tasks;
		}
		
		TaskProvider.prototype.createTask = function(task){
			var tasks = [];
			$http({
				method: "POST",
				url: apiUrl+"tasks",
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: task
			}).then(
				function success (res) {
				tasks = res.data;
			},
				function error (res){
				console.log(res);
			});
			return tasks;
		}
		
		TaskProvider.prototype.updateTask = function(id, task){
			var tasks = [];
			
			$http({
				method: "PUT",
				url: apiUrl+"task/"+id,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: task
			}).then(
				function success (res) {
				tasks = res.data;
			},
				function error (res){
				console.log(res);
			});			
			return tasks;			
		}		
		
		return TaskProvider;		
	}	
})();