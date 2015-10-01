/**
 * Created by arturomc on 9/26/2015.
 */
(function(){
    "use strict";

    angular
        .module("pomodoro")
        .directive("task", taskDirective);

    function taskDirective() {
        return {
            restrict: 'E',
            templateUrl: "./app/list/task.template.html",
            controller: "TaskController",
            controllerAs: "vmTask",
            scope: true,
            bindToController: {
                title: '@',
                description: '@',
                assigneeId: '&',
                pomodoroTicks: '&',
                taskIndex: '&'
            }
        }
    }
})();