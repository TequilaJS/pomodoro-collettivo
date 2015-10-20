(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['$state', '$http'];

    function ListController($state, $http) {
        var vmList = this;


        // Methods
        vmList.checkTask = checkTask;
        vmList.createTask = createTask;
        vmList.deleteTask = deleteTask;
        vmList.getAllTasks = getAllTasks;
        vmList.startTiming = startTiming;
        vmList.swipeCheckTask = swipeCheckTask;

        // Properties
        vmList.tasks = [];
        vmList.task = {};
        vmList.isAddingTask = false;

        (function activate() {
            $http({
                method: 'GET',
                url: '/api/tasks'
            }).then(function success(res) {
                vmList.tasks = res.data;
            }, function error(res) {
                console.log(res);
            });
        })();

        function checkTask(task) {
            console.log('updating a task');
            //var taskStatus = task.status ? 1 : 0;
            $http({
                method: 'PUT',
                url: '/api/task/' + task._id,
                data: {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    elapsedPomodoros: task.elapsedPomodoros
                }
            }).then(function success(res) {
                // ackzell - NOTE: I don't think there is a need to update the entire set
                // otherwise, all tasks marked will be re-drawing everytime 
                // vmList.tasks = res.data;

                // ackzell - NOTE2: I also modified the API a little, and it returns the
                // updated task now
               
                //console.log(res.data);
                
                vmList.task = {};
            }, function error(res) {
                console.log(res);
            });
        }

        function createTask() {

            vmList.task.status = 0;

            if (vmList.task) {
                $http({
                    method: 'POST',
                    url: '/api/tasks/',
                    data: vmList.task
                }).then(function success(res) {
                    vmList.tasks.push(res.data);
                    vmList.task = {};
                }, function error(res) {
                    console.log(res);
                });
            }
        }

        function deleteTask(id) {
            $http({
                method: 'DELETE',
                url: '/api/task/' + id
            }).then(function success(res) {
                //vmList.tasks = res.data;
                _.remove(vmList.tasks, {_id: id});
            }, function error(res) {
                console.log(res);
            });
        }

        function getAllTasks() {
            var tasks = [];

            $http({
                method: 'GET',
                url: '/api/tasks'
            }).then(function success(res) {
                tasks = res.data;
            }, function error(res) {
                console.log(res);
            });

            return tasks;
        }

        function startTiming(task) {
            $state.go('main.countdown', {task: task});
        }

        function swipeCheckTask(task) {
            task.status = true;
            checkTask(task);   
        }
    }
})();