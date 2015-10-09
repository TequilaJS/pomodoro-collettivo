(function() {
    'use strict';

    angular.module('pomodoro', [
        'ui.router',
        'timer',
        'ngAnimate',
        'ngMaterialize',
        'angular-svg-round-progress'
    ]);

    angular
        .module('pomodoro')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider' ];

    function configure($stateProvider, $urlRouterProvider, $locationProvider ) {

        var defaultRoute = localStorage.getItem('defaultTab') || 'main.list';
        
        localStorage.setItem('defaultTab', defaultRoute);

        $urlRouterProvider.otherwise('/' + defaultRoute);

        $stateProvider
            .state('main', {
                abstract: true,
                controller: 'MainController',
                controllerAs: 'vmMain',
                templateUrl: 'app/main.template.html',
                url: '/',
            })
            .state('main.list', {
                controller: 'ListController',
                controllerAs: 'vmList',
                templateUrl: 'app/list/list.template.html',
                url: 'list'    
            })
            .state('main.countdown', {
                controller: 'CountdownController',
                controllerAs: 'vmCountdown',
                templateUrl: 'app/countdown/countdown.template.html',
                url: 'countdown'    
            });
        $locationProvider.html5Mode(true);
        
    }
})();