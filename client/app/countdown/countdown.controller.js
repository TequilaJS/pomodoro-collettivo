(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('CountdownController', CountdownController);

    CountdownController.$inject = ['$scope', '$timeout', 'COUNTDOWN_TYPES', '$stateParams', '$http', '$state'];

    function CountdownController($scope, $timeout, COUNTDOWN_TYPES, $stateParams, $http, $state) {
        var vmCountdown = this,
            sounds = { // this object will hold the Audio objects in the app
                ringer: null,
                ticker: null
            };

        // Methods
        vmCountdown.ringAlarm = ringAlarm;
        vmCountdown.shutUpAlarm = shutUpAlarm;
        vmCountdown.startTimer = startTimer;
        vmCountdown.stopTimer = stopTimer;
        vmCountdown.toggleTickerMute = toggleTickerMute;

        // Properties
        vmCountdown.currentTask = {};

        /* Init function*/
        (function activate() {

            // redirecting to the list state if no task has been fed to this one
            if (!$stateParams.task) {
                $state.go('main.list');
            }
            
            // making the task available to the template
            vmCountdown.currentTask = $stateParams.task;

            // the alarm will sound for 2 seconds.
            vmCountdown.alarmDuration = 2000;

            // setting the first timer to be a pomodoro
            vmCountdown.currentTimer = COUNTDOWN_TYPES.POMODORO;

            // this is the count of pomodoros elapsed during the current session
            vmCountdown.currentCycleCount = 0;

            // this variable will tell the progress bar how much it should be filled
            vmCountdown.elapsedTime = 0;

            // current timer 'state'
            vmCountdown.isTicking = false;

            // ticking sound while the countdown is running
            vmCountdown.tickerSoundOn = true;


            initSounds();

            sounds.ticker.muted = !vmCountdown.tickerSoundOn;

            // The angular-timer directive exposes an api based on events, 
            // catching the ticking event to update the progress bar in the view
            $scope.$on('timer-tick', function(event, value) {
                   

                    // Using the $timeout here to avoid a Firefox error, we need to investigate further
                    // See http://stackoverflow.com/questions/31848518/apply-already-in-progress-when-opening-confirm-dialog-box-with-firefox
                    $timeout(function() { 
                        vmCountdown.elapsedTime = vmCountdown.currentTimer.duration - (value.millis / 1000);
                        $scope.$apply();    
                    },0);
                    
            });
        })();

        function initSounds() {
            sounds.ticker = new Audio('../../assets/sounds/kitchen_timer_counts_down.ogg');
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

            if (vmCountdown.currentTimer === COUNTDOWN_TYPES.POMODORO) {
                if (vmCountdown.currentCycleCount > 0 && vmCountdown.currentCycleCount % 3 === 0) {
                    vmCountdown.currentTimer = COUNTDOWN_TYPES.LONG_BREAK;
                } else {
                    vmCountdown.currentTimer = COUNTDOWN_TYPES.SHORT_BREAK;
                }
                vmCountdown.currentCycleCount++;
                vmCountdown.currentTask.elapsedPomodoros++;

                $http({
                    method: 'PUT',
                    url: '/api/task/' + vmCountdown.currentTask._id,
                    data: vmCountdown.currentTask
                }).then(function success(res) {
                    console.log(res);
                }, function error(res) {
                    console.log(res);
                });

            } else {
                vmCountdown.elapsedTime = 0;
                vmCountdown.currentTimer = COUNTDOWN_TYPES.POMODORO;
            }

            // will auto shut down the alarm after n seconds
            $timeout(function() {
                shutUpAlarm();
                vmCountdown.isTicking = false;
            }, vmCountdown.alarmDuration);

        }

        function shutUpAlarm() {
            sounds.currentTime = 0;
            sounds.ringer.pause();
        }

        function startTimer() {
            // document.getElementsByTagName('timer')[0].start();
            $scope.$broadcast('timer-start');
            // in case the alarm is on
            shutUpAlarm();
            playTicker();
            vmCountdown.isTicking = true;
        }

        function stopTicker() {
            sounds.ticker.pause();
        }

        function stopTimer() {

            stopTicker();

            // in case the alarm is on
            shutUpAlarm();

            vmCountdown.isTicking = false;
           
            vmCountdown.currentTimer = COUNTDOWN_TYPES.POMODORO;

            $scope.$watch(function(){ return vmCountdown.currentTimer; }, function() {
                vmCountdown.elapsedTime = 0;
                $scope.$broadcast('timer-reset');
            });
                
        }

        function toggleTickerMute() {
            sounds.ticker.muted = !vmCountdown.tickerSoundOn;
        }

    }
})();