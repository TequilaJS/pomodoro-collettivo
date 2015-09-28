(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('CountdownController', CountdownController);

    CountdownController.$inject = ['$scope', '$timeout'];

    function CountdownController($scope, $timeout) {
        var vmCountdown = this,
            sounds = {
                ringer: null,
                ticker: null
            };

        vmCountdown.message = 'Hello from the countdown controller!';

        vmCountdown.ringAlarm = ringAlarm;
        vmCountdown.shutUpAlarm = shutUpAlarm;
        vmCountdown.startTimer = startTimer;
        vmCountdown.stopTimer = stopTimer;
        vmCountdown.toggleTickerMute = toggleTickerMute;

        //duration of the pomodoro in seconds
        // vmCountdown.pomodoroDuration = 1500;
        vmCountdown.pomodoroDuration = 5;

        //duration of short breaks in seconds 
        vmCountdown.shortBreakDuration = 300;

        //duration of long breaks in seconds
        vmCountdown.longBreakDuration = 900;

        vmCountdown.alarmDuration = 3000;

        activate();

        function activate() {
            initSounds();
            console.log('vmCountdown.tickerMuted', vmCountdown.tickerMuted);
            sounds.ticker.muted = vmCountdown.tickerMuted;
        }

        function initSounds(){
            sounds.ticker = new Audio('../../assets/sounds/kitchen_timer_counts_down.mp3');
            sounds.ringer = new Audio('../../assets/sounds/ring.ogg');

            sounds.ticker.loop = true;
            sounds.ringer.loop = true;
        }

        function ringAlarm() {
            stopTicker();
            sounds.ringer.play();

            // will auto shut down the alarm after 3 seconds
            $timeout(function() {
               shutUpAlarm();
            }, vmCountdown.alarmDuration);
        }

        function shutUpAlarm() {
            sounds.ringer.pause();
            sounds.ringer.load();
        }

        function playTicker() {
            sounds.ticker.play();
        }

        function stopTicker() {
            sounds.ticker.pause();
        }

        function startTimer() {
            document.getElementsByTagName('timer')[0].start();

            // in case the alarm is on
            shutUpAlarm();
            playTicker();
        }

        function stopTimer() {
            document.getElementsByTagName('timer')[0].reset();
            stopTicker();
            // in case the alarm is on
            shutUpAlarm();
        }

        function toggleTickerMute() {
            console.log('ticker:', vmCountdown.tickerMuted);
            sounds.ticker.muted = vmCountdown.tickerMuted;
        }

    }
})();