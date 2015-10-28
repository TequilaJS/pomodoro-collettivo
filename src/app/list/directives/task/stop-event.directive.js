(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('stopEvent', stopEvent);

    stopEvent.$inject = [];

    function stopEvent () {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            element.on(attrs.stopEvent, function (event){
                event.stopPropagation();
            });
        }
    }

})();