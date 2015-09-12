(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('MainController', MainController);

    MainController.$inject = [];

    /* @ngInject */
    function MainController() {
        var vmMain = this;
        vmMain.greeting = 'Hello Pomodoro!';

        activate();

        ////////////////

        function activate() {
        }
    }
})();