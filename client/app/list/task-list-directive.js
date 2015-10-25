(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTaskList', TaskList);

    TaskList.$inject = [];

    function TaskList() {

        var directive = {
            bindToController: {
                filter: '=',
                header: '=',
                tasks: '='
            },
            controller: TaskListController,
            controllerAs: 'vmTaskList',
            link: link,
            restrict: 'E',
            require: 'pcTaskList',
            scope: {},
            templateUrl: './app/list/task-list.template.html'
        };
        return directive;

        function link(scope, element, attrs, vmTaskList) {

            // event subscriptions
            scope.$on('task:check', function(event, task) {
                vmTaskList.checkTask(task);
            });

        }
    }

    TaskListController.$inject  = ['taskService'];

    function TaskListController(taskService) {
        var vmTaskList = this;

        vmTaskList.checkTask = checkTask;
        vmTaskList.deleteTask = deleteTask;

        function checkTask(task) {
            return taskService.checkTask(task)
                .then(checkTaskComplete, checkTaskFailed);

            function checkTaskComplete() {
                console.log('check task complete!');
            }

            function checkTaskFailed() {
                console.log('check task failed');
            }
        }

        function deleteTask(task) {
            var id = task._id;

            return taskService.deleteTask(id)
                .then(deleteTaskCompleted, deleteTaskFailed);

            function deleteTaskCompleted(response) {
                var i = 0;
                while (i < vmTaskList.tasks.length) {
                    if (vmTaskList.tasks[i]._id === id) {
                        vmTaskList.tasks.splice(i, 1);
                        break;
                    }
                    i++;
                }
            }

            function deleteTaskFailed(response) {
                console.log('error while removing a task');
            }
        }
    }
})();