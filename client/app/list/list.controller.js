(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['countdownStatus', "$http"];

    function ListController(countdownStatus, $http) {
        var vmList = this;

        vmList.tasks = [];		
		vmList.task = {};
		vmList.isAddingTask = false;

        $http({
            method: "GET",
            url: "/api/tasks"
        }).then(function success (res) {
            vmList.tasks = res.data;
        }, function error (res){
            console.log(res);
        });

		vmList.deleteTask = function(id){						
			$http({
				method: "DELETE",
				url: "/api/task/"+id
			}).then(function success (res) {				
				vmList.tasks = res.data;
			}, function error (res){
				console.log(res);
			});
		}
						
		vmList.getAllTasks = function(){
			var tasks = [];
			
			$http({
				method: "GET",
				url: "/api/tasks"
			}).then(function success (res) {
				tasks = res.data;
			}, function error (res){
				console.log(res);
			});
			
			return tasks;			
		}
		
		vmList.createTask = function(){
			$http({
				method: "POST",
				url: "/api/tasks/",
				data: vmList.task
			}).then(function success (res) {				
				vmList.tasks = res.data;
				vmList.task = {};
				vmList.isAddingTask = false;
			}, function error (res){
				console.log(res);
			});
		};

		vmList.checkTask = function(task){
			console.log("updating a task");
			//var taskStatus = task.status ? 1 : 0;
			$http({
				method: "PUT",
				url: "/api/task/"+task._id,
				data: {
					title:task.title,
					description: task.description,
					status: task.status
				}
			}).then(function success (res) {
				vmList.tasks = res.data;
				vmList.task = {};
			}, function error (res){
				console.log(res);
			});
		};

        vmList.title = 'ListController';

        vmList.message = 'Hello from the list controller!';

        activate();

        function activate() {
        }
    }
})();
