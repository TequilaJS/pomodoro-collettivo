(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcSound', pcSound);

    pcSound.$inject = [];

    function pcSound () {
        var directive = {
            controller: SoundController,
            controllerAs: 'vmSound',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    function SoundController () {

    }
})();