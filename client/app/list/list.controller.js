(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ListController', ListController);

    ListController.$inject = ['countdownStatus', "$http"];

    function ListController(countdownStatus, $http) {
        var vmList = this;

        vmList.tasks = [];


        $http({
            method: "GET",
            url: "/api/tasks"
        }).then(function success (res) {
            vmList.tasks = res.data;
        }, function error (res){
            console.log(res);
        });

        vmList.title = 'ListController';

        vmList.message = 'Hello from the list controller!';

        activate();

        function activate() {
        }
    }
})();