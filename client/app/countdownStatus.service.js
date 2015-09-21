(function() {
    'use strict';

    angular
        .module('pomodoro')
        .service('countdownStatus', countdownStatus);

    countdownStatus.$inject = [];

    function countdownStatus() {
        var countdownStatus = this,
            currentStatus = '';

        countdownStatus.isTicking = isTicking;
        countdownStatus.setStatus = setStatus;


        function isTicking() {
            return currentStatus === 'started';
        }

        function setStatus(newStatus) {
            currentStatus = newStatus;
        }
    }
})();