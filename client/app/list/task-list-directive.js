(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTaskList', TaskList);

    TaskList.$inject = [];

    function TaskList () {

        var directive = {
            bindToController: {
                filter: '=',
                header: '=',
                tasks: '='
            },
            controller: Controller,
            controllerAs: 'vmTaskList',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: './app/list/task-list.template.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function Controller () {
        var vmTaskList = this;

        vmTaskList.greet = function() {
            console.log('hello from task-list directive!');
        };
    }
})();