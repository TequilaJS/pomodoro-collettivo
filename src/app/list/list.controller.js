(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$state', 'taskService'];

    function ListController($scope, $state, taskService) {
        var vmList = this;

        // Methods
        vmList.startTiming = startTiming;

        // Properties
        vmList.tasks = [];

        $scope.$on('task:created', function(event, task) {
            vmList.tasks.push(task);
        });

        $scope.$on('task:startedTiming', function (event, task) {
            startTiming(task);
        });

        $scope.$on('task:updated', function(event, task) {
            var id = task._id,
                i = 0;

            while (i < vmList.tasks.length) {
                if (vmList.tasks[i]._id === id) {
                    vmList.tasks.splice(i, 1, task);
                    break;
                }
                i++;
            }
        });

        (function activate() {
            // optionally do:
            /*getAllTasks().then(function() {
                console.log('allTasks finished all right');
            });*/
            getAllTasks();

        })();

        function getAllTasks() {
            return taskService.getAllTasks()
                .then(function(data) {
                    vmList.tasks = data;
                });
        }

        function startTiming(task) {
            $state.go('main.countdown', {
                task: task
            });
        }
    }
})();