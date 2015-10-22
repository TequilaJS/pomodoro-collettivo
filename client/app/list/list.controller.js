(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['$state', '$http', 'taskService', '$scope'];

    function ListController($state, $http, taskService, $scope) {
        var vmList = this;

        // Methods
        vmList.createTask = createTask;
        vmList.startTiming = startTiming;

        // Properties
        vmList.tasks = [];
        vmList.task = {};
        vmList.isAddingTask = false;

        (function activate() {
            // optionally do:
            /*getAllTasks().then(function() {
                console.log('allTasks finished all right');
            });*/
            getAllTasks();

        })();

        function createTask() {
            return taskService.createTask(vmList.task)
                .then(function(res) {
                    vmList.tasks.push(res.data);
                    vmList.task = {};
                });
        }

        function getAllTasks() {
            return taskService.getAllTasks()
                .then(function(data) {
                    vmList.tasks = data;
                });
        }

        $scope.$on('task-removed', function(event, id) {
            var i = 0;
            while(i < vmList.tasks.length) {
                if (vmList.tasks[i]._id === id) {
                    vmList.tasks.splice(i, 1);
                    break;
                }
                i++;
            }
        });

        function startTiming(task) {
            $state.go('main.countdown', {
                task: task
            });
        }


    }
})();