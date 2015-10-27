(function() {
    'use strict';

    angular
        .module('pomodoro')
        .directive('pcTask', pcTask);

    pcTask.$inject = ['$modal'];

    function pcTask($modal) {

        var directive = {
            bindToController: {
                /* 
                    Here is an example of how we can name the parameter 
                    that will be sent from the view, 
                    in this case it will have to be defined as
                    task-model="" when using the directive
                */
                task: '=taskModel' 
            },
            controller: TaskController,
            controllerAs: 'vmTask',
            link: link,
            /*
                The following is an alternative way to communicate
                a directive with it's parent directive. 

                Another way to communicate them would be through
                the use of events.

                Notice that  only are we  requiring the parent's controller, 
                but also using this direcetive's controller
                inside the linking function.
            */
            require: ['^pcTaskList', '^pcTask'], 
            restrict: 'E',
            /*
                Notice the lack of definition of scope parameters
                in here, since they are already declared in the
                bindToController option.
            */
            scope: {},
            templateUrl: './app/list/directives/task/task.template.html'
        };
        return directive;

        /*
            Tere is a fourth param, which will hold all the 
            controllers that have been required on the 
            directive's definition
        */
        function link(scope, element, attrs, controllers) {
            var vmTaskList = controllers[0], // this is the parent's controller
                vmTask = controllers[1];     // this is our directive's controller

            /*
                We are exposing an API that reflects the one 
                created on the TaskList directive.

                This is so we can keep the views consistent, in other words
                we can still use the 'vmTask' on the view, and have a 
                communication with the parent directive.
            */
            vmTask.checkTask = checkTask; 
            vmTask.deleteTask = deleteTask;
            vmTask.openModal = openModal;
            vmTask.startTiming = startTiming;
            vmTask.swipeCheckTask = swipeCheckTask;

            function checkTask() {
                vmTaskList.checkTask(vmTask.task);
            }

            function deleteTask() {
                vmTaskList.deleteTask(vmTask.task);
            }

            function openModal($event) {

                $modal.open({
                    anchorElement: $event ? angular.element($event.target) : undefined,
                    /*
                        Notice the use of a string to declare the controler, 
                        this is because the controller is part of the app's module
                        and not a function that can be found inside this closure.
                    */
                    controller: 'ModalController',
                    controllerAs: 'vmModal',
                    /*
                        Similar to states, this modal service can resolve 
                        or have assigned variables to it on instantiation.
                    */
                    resolve: {
                        /*
                            In this case, we want the task to be a local variable
                            inside the modal's scope, so that it can be read by the
                            TaskForm directive.
                        */
                        task: function() {
                            return vmTask.task;
                        }
                    },
                    /*
                        We need to assign the same scope that the directive has so that 
                        the event functionality works.

                        See more about this on the modal's controller.
                    */
                    scope: scope,
                    templateUrl: './app/list/directives/task/edit-task-modal.html',
                });

            }

            function startTiming() {
                scope.$emit('task:startedTiming', vmTask.task);
            }

            /*
                Since we are implementing a bit of gestures (ng-swipe)
            */
            function swipeCheckTask() {
                vmTask.task.status = true;
                checkTask();
            }
        }
    }

    TaskController.$inject = [];

    function TaskController() {
        var vmTask = this;

        (function init() {

        })();
    }

})();