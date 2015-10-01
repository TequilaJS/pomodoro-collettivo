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
		
		vmList.updateTask = function(id){						
						
			$http({
				method: "POST",
				url: "/api/task/"+id,
				data: task
			}).then(function success (res) {				
				vmList.tasks = res.data;
			}, function error (res){
				console.log(res);
			});
		}
		
        vmList.title = 'ListController';

        vmList.message = 'Hello from the list controller!';

        activate();

        function activate() {
        }
    }
})();
