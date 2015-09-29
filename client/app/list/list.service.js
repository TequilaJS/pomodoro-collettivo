(function(){
    "use strict";

    angular
        .module("pomodoro")
        .factory("taskListFactory", listService);

    listService.$inject = ["$http"];

    function listService ($http){

        return function () {
            var tasks = [];

            $http.get("/api/tasks", function(err, data){
                if (err) {console.log(err); return};
                console.log(data);
                tasks = data

            });

            return tasks;
        }

    }
})();