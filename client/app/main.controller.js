(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('MainController', MainController);

    MainController.$inject = [];

    function MainController() {
        var vmMain = this;
        vmMain.title = 'MainController';

        vmMain.display = display;
        vmMain.currentTask = "Current task name goes here.";

        activate();

        function activate() {
            vmMain.displayView = 'countdown';
        }
        function display(view) {
            vmMain.displayView = view;
        }

        function setCurrentTask(task) {
            vmMain.currentTask = task;
        }
    }
})();