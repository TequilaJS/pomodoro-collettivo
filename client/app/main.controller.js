(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state'];

    function MainController($scope, $state) {
        var vmMain = this;
        
        vmMain.currentTask = "Current task name goes here.";

        (function activate() {
            // vmMain.displayView = localStorage.getItem('defaultTab');
        })();

        function setCurrentTask(task) {
            vmMain.currentTask = task;
        }

        $scope.$on('$stateChangeSuccess', function() {
            localStorage.setItem('defaultTab', $state.current.url);
        });
    }
})();