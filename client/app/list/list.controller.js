(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['countdownStatus'];

    function ListController(countdownStatus) {
        var vmList = this;
        vmList.title = 'ListController';

        vmList.message = 'Hello from the list controller!';

        activate();

        function activate() {
        }
    }
})();