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
            },
            countdown_types = {
                POMODORO: {
                    color: '#f44336', //red
                    duration: 15,
                    // duration: 1500   
                    name: 'Pomodoro',
                },
                SHORT_BREAK: {
                    color: '#03a9f4', //light-blue
                    duration: 4,
                    // duration: 300   
                    name: 'Short Break',
                },
                LONG_BREAK: {
                    color: '#fdd835', //yellow darken-1
                    duration: 10,
                    // duration: 900   
                    name: 'Long Break',
                },
            };

        // Methods
        vmCountdown.ringAlarm = ringAlarm;
        vmCountdown.shutUpAlarm = shutUpAlarm;
        vmCountdown.startTimer = startTimer;
        vmCountdown.stopTimer = stopTimer;
        vmCountdown.toggleTickerMute = toggleTickerMute;

        // Properties
        vmCountdown.countdown_types = countdown_types;

        /* Init function*/
        (function activate() {

            vmCountdown.alarmDuration = 2000;
            vmCountdown.currentTimer = countdown_types.POMODORO;
            vmCountdown.elapsedPomodoros = 0;
            vmCountdown.elapsedTime = 0;
            vmCountdown.isTicking = false;
            vmCountdown.tickerSoundOn = true;

            initSounds();
            sounds.ticker.muted = !vmCountdown.tickerSoundOn;

            // This is ugly, I gotta say :(
            $scope.$on('timer-tick', function(event, value) {
                $timeout(function() {
                    vmCountdown.elapsedTime = vmCountdown.currentTimer.duration - (value.millis / 1000);
                    $scope.$apply();
                }, 0);
            });
        })();

        function initSounds() {
            sounds.ticker = new Audio('../../assets/sounds/kitchen_timer_counts_down.mp3');
            sounds.ringer = new Audio('../../assets/sounds/ring.ogg');

            sounds.ticker.loop = true;
            sounds.ringer.loop = true;
        }

        function playTicker() {
            sounds.ticker.play();
        }

        function ringAlarm() {
            stopTicker();
            sounds.ringer.play();

            if (vmCountdown.currentTimer === countdown_types.POMODORO) {
                if (vmCountdown.elapsedPomodoros > 0 && vmCountdown.elapsedPomodoros % 3 === 0) {
                    vmCountdown.currentTimer = countdown_types.LONG_BREAK;
                } else {
                    vmCountdown.currentTimer = countdown_types.SHORT_BREAK;
                }
                vmCountdown.elapsedPomodoros++;
            } else {
                vmCountdown.currentTimer = countdown_types.POMODORO;
            }

            $scope.$apply(); // update the current timer key for the timer to use

            // will auto shut down the alarm after n seconds
            $timeout(function() {
                shutUpAlarm();
                startTimer();
            }, vmCountdown.alarmDuration);

        }

        function shutUpAlarm() {
            sounds.currentTime = 0;
            sounds.ringer.pause();
        }

        function startTimer() {
            document.getElementsByTagName('timer')[0].start();

            // in case the alarm is on
            shutUpAlarm();
            playTicker();
            vmCountdown.isTicking = true;
        }

        function stopTicker() {
            sounds.ticker.pause();
        }

        function stopTimer() {
            document.getElementsByTagName('timer')[0].reset();
            stopTicker();
            // in case the alarm is on
            shutUpAlarm();

            vmCountdown.isTicking = false;
            vmCountdown.currentTimer = countdown_types.POMODORO;
            vmCountdown.elapsedPomodoros = 0;
        }

        function toggleTickerMute() {
            sounds.ticker.muted = !vmCountdown.tickerSoundOn;
        }

    }
})();