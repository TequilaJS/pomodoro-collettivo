(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTask', pcTask);

    pcTask.$inject = [];

    function pcTask () {

        var directive = {
            bindToController: {
                task: '=taskModel'
            },
            controller: TaskController,
            controllerAs: 'vmTask',
            link: link,
            require: '^pcTaskList',
            restrict: 'E',
            scope: {},
            templateUrl: './app/list/task.template.html'
        };
        return directive;

        function link(scope, element, attrs, vmTaskList) {
            vmTaskList.greet();
        }
    }
    
    TaskController.$inject = ['$scope', 'taskService'];

    function TaskController($scope, taskService) {
        var vmTask = this;

        vmTask.checkTask = checkTask;
        vmTask.deleteTask = deleteTask;
        vmTask.swipeCheckTask = swipeCheckTask;

        vmTask.wo = function() {
            console.log('wo!');
        };

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
