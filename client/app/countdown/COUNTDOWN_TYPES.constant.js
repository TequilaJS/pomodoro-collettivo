(function() {
	'use strict';

	angular
		.module('pomodoro')
		.constant('COUNTDOWN_TYPES', {
            POMODORO: {
                color: '#f44336',
                materialColor: 'red',
                duration: 5,
                // duration: 1500   
                name: 'Pomodoro',
            },
            SHORT_BREAK: {
                color: '#03a9f4',
                materialColor: 'light-blue',
                duration: 4,
                // duration: 300   
                name: 'Short Break',
            },
            LONG_BREAK: {
                color: '#fdd835',
                materialColor: 'yellow darken-1',
                duration: 3,
                // duration: 900   
                name: 'Long Break',
            },
        });
})();