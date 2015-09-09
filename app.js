(function () {
    'use strict';

    angular.module('pomodoroApp', ['timer']);

    function MainController() {
        var vmMain = this;
        vmMain.message = 'Hello Pomodoro!';
    }

    angular
        .module('pomodoroApp')
        .controller('MainController', MainController);
})();