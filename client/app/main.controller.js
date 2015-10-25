(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', '$timeout'];

    function MainController($scope, $state, $timeout) {
        var vmMain = this;
        
        (function activate() {
            /*
                Exposing the $state service to the view
            */
            $scope.$state  = $state;
        })();

        function setCurrentTask(task) {
            vmMain.currentTask = task;
        }
        
        $scope.$on('$stateChangeSuccess', function() {
            vmMain.listActive = $state.current.url === 'list' ? true : false;
            vmMain.countdownActive = $state.current.url === 'countdown' ? true : false;
            localStorage.setItem('defaultTab', $state.current.url);
        });
    }
})();