(function() {
	'use strict';

	angular
		.module('pomodoro')
		.factory('taskService', taskService);

	taskService.$inject = ['$http', '$q'];

	function taskService($http, $q) {
		var baseUrl = '/api',
			service = {
				checkTask: checkTask,
				createTask: createTask,
				deleteTask: deleteTask,
				getAllTasks: getAllTasks,
				updateTask: updateTask
			};
		return service;

		function checkTask(task) {
			return $http.put(baseUrl + '/task/' + task._id, task)
				.then(checkTaskComplete)
				.catch(checkTaskFailed);

			function checkTaskComplete(response) {
				return response;
			}

			function checkTaskFailed(err) {
				console.log('XHR Failed to check a task', err);
			}
		}

		function createTask(task) {
			task.status = 0;
			return $http.post(baseUrl + '/tasks/', task)
				.then(createTaskComplete)
				.catch(createTaskFailed);

			function createTaskComplete(response) {
				return response;
			}

			function createTaskFailed(err) {
				console.log('XHR Failed when creating task', err);
			}
		}

		function deleteTask(id) {
			return $http.delete(baseUrl + '/task/' + id)
				.then(deleteTaskComplete)
				.catch(deleteTaskFailed);

			function deleteTaskComplete(response) {
				return response;
			}

			function deleteTaskFailed(error) {
				console.log('XHR Failed for deleteTask', error);
			}

		}

		function getAllTasks() {
			return $http.get(baseUrl + '/tasks')
				.then(getAllTasksComplete)
				.catch(getAllTasksFailed);

			function getAllTasksComplete(response) {
				return response.data;
			}

			function getAllTasksFailed(error) {
				console.log('XHR Failed for AllTasks', error);
			}
		}

		function updateTask(task) {
			return checkTask(task);
		}
	}
})();