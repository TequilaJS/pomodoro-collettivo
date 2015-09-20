(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('CountdownController', CountdownController);

    CountdownController.$inject = ['$scope', 'countdownStatus'];

    function CountdownController($scope, countdownStatus) {
        var vmCountdown = this;

        vmCountdown.message = 'Hello from the countdown controller!';

        vmCountdown.ring = ring;
        vmCountdown.startTimer = startTimer;
        vmCountdown.stopTimer = stopTimer;

        //duration of the pomodoro in seconds
        vmCountdown.pomodoroDuration = 1500;

        //duration of short breaks in seconds 
        vmCountdown.shortBreakDuration = 300;

        //duration of long breaks in seconds
        vmCountdown.longBreakDuration = 900;

        activate();

        function activate() {
           countdownStatus.setStatus('stopped');

        }

        function ring() {
            console.log('ring!!!!!', new Date());
        }

        function startTimer() {
            $scope.$broadcast('timer-start');
            countdownStatus.setStatus('started');
        }

        function stopTimer() {
            $scope.$broadcast('timer-stop');
            countdownStatus.setStatus('stopped');
        }
    }
})();