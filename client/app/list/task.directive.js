/**
 * Created by arturomc on 9/26/2015.
 */
(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTask', taskDirective);

    function taskDirective() {
        return {
            bindToController: {
                task: '=taskModel'
            },
            controller: TaskController,
            controllerAs: 'vmTask',
            restrict: 'E',
            scope: {},
            templateUrl: './app/list/task.template.html'
        };
    }

    TaskController.$inject = ['$scope', 'taskService'];

    function TaskController($scope, taskService) {
        var vmTask = this;

        vmTask.checkTask = checkTask;
        vmTask.deleteTask = deleteTask;
        vmTask.swipeCheckTask = swipeCheckTask;

        (function init() {
            // assignProperties();
        })();

        function assignProperties() {
            for (var p in vmTask.taskModel) {
                vmTask[p] = vmTask.taskModel[p];
            }
        }

        function checkTask() {
            return taskService.checkTask(vmTask.task);
        }

        function deleteTask() {
            return taskService.deleteTask(vmTask.task._id)
                .then(function deleteTaskCompleted(response) {
                   $scope.$emit('task-removed', vmTask.task._id);
                });
        }

        function swipeCheckTask() {
            vmTask.task.status = true;
            checkTask();
        }

    } // TaskController

})();