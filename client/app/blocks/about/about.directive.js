(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('about', about);

    about.$inject = [];

    /* @ngInject */
    function about () {
        // Usage:
        //  <about></about>
        // Creates:
        //  
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'app/blocks/about/about.template.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    function Controller () {

    }
})();