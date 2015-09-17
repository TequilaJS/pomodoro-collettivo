(function() {
    'use strict';

    angular.module('pomodoro', ['ui.router', 'timer']);

    angular
        .module('pomodoro')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider' /*, '$locationProvider'*/];

    function configure($stateProvider, $urlRouterProvider /*, $locationProvider*/) {

        $urlRouterProvider.otherwise('/list');

        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'app/list/list.template.html',
                controller: 'ListController',
                controllerAs: 'vmList'
            })
            .state('countdown', {
                url: '/countdown',
                templateUrl: 'app/countdown/countdown.template.html',
                controller: 'CountdownController',
                controllerAs: 'vmCountdown'
            });

        // $locationProvider.html5Mode(true);
    }
})();