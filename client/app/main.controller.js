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

        activate();

        function activate() {
            vmMain.displayView = 'list';
        }
        function display(view) {
            vmMain.displayView = view;
        }
    }
})();