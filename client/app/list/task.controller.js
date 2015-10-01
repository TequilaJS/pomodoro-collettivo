(function(){
    "use strict";

    angular
        .module("pomodoro")
        .controller("TaskController", TaskController);


    TaskController.$inject = ["$scope"];

    function TaskController($scope) {


        var vmTask = this;


        console.log(vmTask)
    }
})();