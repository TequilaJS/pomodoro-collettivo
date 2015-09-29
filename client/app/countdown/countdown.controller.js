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

        vmCountdown.ringAlarm = ringAlarm;
        vmCountdown.shutUpAlarm = shutUpAlarm;
        vmCountdown.startTimer = startTimer;
        vmCountdown.stopTimer = stopTimer;
        vmCountdown.toggleTickerMute = toggleTickerMute;

        //duration of the pomodoro in seconds
        // vmCountdown.pomodoroDuration = 1500;
        vmCountdown.pomodoroDuration = 10;

        //duration of short breaks in seconds 
        // vmCountdown.shortBreakDuration = 300;
        vmCountdown.shortBreakDuration = 4;

        //duration of long breaks in seconds
        // vmCountdown.longBreakDuration = 900;
        vmCountdown.longBreakDuration = 6;

        vmCountdown.alarmDuration = 3;

        activate();

        function activate() {

            vmCountdown.elapsedPomodoros = 0;
            vmCountdown.currentTimer = 'pomodoro';
            vmCountdown.isTicking = false;

            vmCountdown.elapsedTime = 0;

            initSounds();
            sounds.ticker.muted = vmCountdown.tickerMuted;

            // This is ugly, I gotta say :(
            $scope.$on('timer-tick', function(event, value){
              
                $timeout(function(){
                    vmCountdown.elapsedTime = vmCountdown[vmCountdown.currentTimer + 'Duration'] - (value.millis / 1000);
                    $scope.$apply();    
                },0);

                
            });
        }

        function initSounds() {
            sounds.ticker = new Audio('../../assets/sounds/kitchen_timer_counts_down.mp3');
            sounds.ringer = new Audio('../../assets/sounds/ring.ogg');

            sounds.ticker.loop = true;
            sounds.ringer.loop = true;
        }

        function ringAlarm() {
            stopTicker();
            sounds.ringer.play();

            // will auto shut down the alarm after n seconds
            $timeout(function() {
                shutUpAlarm();
            }, vmCountdown.alarmDuration);

             switch (vmCountdown.currentTimer) {
                    case 'pomodoro':
                        if (vmCountdown.elapsedPomodoros > 0 && vmCountdown.elapsedPomodoros % 3 === 0) {
                            vmCountdown.currentTimer = 'longBreak';
                        } else {
                            vmCountdown.currentTimer = 'shortBreak';
                        }
                        vmCountdown.elapsedPomodoros++;
                        break;
                    case 'shortBreak':
                        vmCountdown.currentTimer = 'pomodoro';
                        break;
                    case 'longBreak':
                        vmCountdown.currentTimer = 'pomodoro';
                        break;
                }
            $scope.$apply(); // update the current timer key for the timer to use
            startTimer();
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
            vmCountdown.isTicking = true;
        }

        function stopTimer() {
            document.getElementsByTagName('timer')[0].reset();
            stopTicker();
            // in case the alarm is on
            shutUpAlarm();

            vmCountdown.isTicking = false;
            vmCountdown.currentTimer = 'pomodoro';
            vmCountdown.elapsedPomodoros = 0;
        }

        function toggleTickerMute() {
            sounds.ticker.muted = vmCountdown.tickerMuted;
        }

    }
})();