(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTask', pcTask);

    pcTask.$inject = ['$modal'];

    function pcTask($modal) {

        var directive = {
            bindToController: {
                task: '=taskModel'
            },
            controller: TaskController,
            controllerAs: 'vmTask',
            link: link,
            require: ['^pcTaskList', '^pcTask'],
            restrict: 'E',
            scope: {},
            templateUrl: './app/list/task.template.html'
        };
        return directive;

        function link(scope, element, attrs, controllers) {
            var vmTaskList = controllers[0],
                vmTask = controllers[1];

            vmTask.checkTask = checkTask;
            vmTask.deleteTask = deleteTask;
            vmTask.swipeCheckTask = swipeCheckTask;
            vmTask.openModal = openModal;

            function checkTask() {
                vmTaskList.checkTask(vmTask.task);
            }

            function deleteTask() {
                vmTaskList.deleteTask(vmTask.task);
            }

            function openModal($event) {

                $modal.open({
                    anchorElement: $event ? angular.element($event.target) : undefined,
                    controller: 'ModalController',
                    controllerAs: 'vmModal',
                    resolve: {
                        task: function() {
                            return vmTask.task;
                        }
                    },
                    scope: scope,
                    templateUrl: './app/list/edit-task-modal.html',
                });

            }

            function swipeCheckTask() {
                vmTask.task.status = true;
                checkTask();
            }
        }
    }

    TaskController.$inject = [];

    function TaskController() {
        var vmTask = this;

        (function init() {

        })();
    }

})();