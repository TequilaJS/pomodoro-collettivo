(function() {
    'use strict';

    angular
        .module('pomodoro')
        .service('soundService', soundService);

    soundService.$inject = [];

    function soundService() {
        var sounds = {
                ringer: null,
                ticker: null
            },
            service = this,
            tickerMuted = false;

        service.initSounds  = initSounds;
        service.playTicker  = playTicker;
        service.ringAlarm   = ringAlarm;
        service.shutUpAlarm = shutUpAlarm;
        service.stopTicker  = stopTicker;


        initSounds();

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
        }

        function shutUpAlarm() {
            sounds.ringer.pause();
            sounds.ringer.load();
        }

        function stopTicker() {
            sounds.ticker.pause();
        }

    }
})();