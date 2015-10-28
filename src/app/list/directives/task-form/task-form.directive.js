(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTaskForm', pcTaskForm);

    pcTaskForm.$inject = [];

    function pcTaskForm() {

        var directive = {
            bindToController: {
                task: '=?'
            },
            controller: TaskFormController,
            controllerAs: 'vmTaskForm',
            link: link,
            restrict: 'E',
            scope: true,
            templateUrl: './app/list/directives/task-form/task-form.directive.html'
        };
        return directive;

        function link(scope, element, attrs, controllers) {
          
        }
    }

    TaskFormController.$inject = ['$scope', 'taskService'];

    function TaskFormController($scope, taskService) {
        var vmTaskForm = this;

        vmTaskForm.save = save;

        (function init() {
            if (!vmTaskForm.task) {
                vmTaskForm.isEditMode = false;
                vmTaskForm.task = {};
            } else {
                vmTaskForm.isEditMode = true;
            }
        })();

        function save(task) {
            if (!vmTaskForm.isEditMode) {
                return taskService.createTask(task)
                .then(function(res) {
                    $scope.$emit('task:created', res.data);
                    vmTaskForm.task = {};
                });    
            } else {
                return taskService.checkTask(task)
                .then(function(res) {
                    $scope.$emit('task:updated', res.data);
                });
            }
            
        }

    }
})();