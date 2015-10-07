(function() {
    'use strict';

    angular.module('pomodoro', [
        'ui.router', 
        'timer',
        'ui.materialize',
        'angular-svg-round-progress']);

    angular
        .module('pomodoro')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'/*, '$stickyStateProvider' , '$locationProvider'*/ ];

    function configure($stateProvider, $urlRouterProvider/*, $stickyStateProvider , $locationProvider*/ ) {

        $urlRouterProvider.otherwise('/');
        // $stickyStateProvider.enableDebug(true);
        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    'list': {
                        templateUrl: 'app/list/list.template.html',
                        controller: 'ListController',
                        controllerAs: 'vmList'        
                    },
                    'countdown': {
                        templateUrl: 'app/countdown/countdown.template.html',
                        controller: 'CountdownController',
                        controllerAs: 'vmCountdown',
                    }
                }
            });
        // $locationProvider.html5Mode(true);
    }
})();