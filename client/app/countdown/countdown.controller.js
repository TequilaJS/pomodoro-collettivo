(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('CountdownController', CountdownController);

    CountdownController.$inject = [];

    /* @ngInject */
    function CountdownController() {
        var vmCountdown = this;
        vmCountdown.title = 'CountdownController';

        vmCountdown.message = 'Hello from the countdown controller!';
      
        activate();

        ////////////////

        function activate() {
        }
    }
})();
