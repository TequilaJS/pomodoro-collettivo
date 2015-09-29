(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('CountdownController', CountdownController);

    CountdownController.$inject = ['$timeout'];

    function CountdownController($timeout) {
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
        vmCountdown.pomodoroDuration = 5;

        //duration of short breaks in seconds 
        // vmCountdown.shortBreakDuration = 300;
        vmCountdown.shortBreakDuration = 3;

        //duration of long breaks in seconds
        // vmCountdown.longBreakDuration = 900;
        vmCountdown.longBreakDuration = 1;

        vmCountdown.alarmDuration = 3000;

        activate();

        function activate() {

            vmCountdown.elapsedPomodoros = 0;
            vmCountdown.currentTimer = 'pomodoro';
            vmCountdown.isTicking = false;

            initSounds();
            sounds.ticker.muted = vmCountdown.tickerMuted;
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

                switch (vmCountdown.currentTimer) {
                    case 'pomodoro':
                        if (vmCountdown.elapsedPomodoros % 4 === 0) {
                            vmCountdown.currentTimer = 'shortBreak';
                        } else {
                            vmCountdown.currentTimer = 'longBreak';
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

                startTimer();
                

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
            vmCountdown.isTicking = true;
        }

        function stopTimer() {
            document.getElementsByTagName('timer')[0].reset();
            stopTicker();
            // in case the alarm is on
            shutUpAlarm();
            
            vmCountdown.isTicking = false;
            vmCountdown.currentTimer = 'pomodoro';
        }

        function toggleTickerMute() {
            sounds.ticker.muted = vmCountdown.tickerMuted;
        }

    }
})();