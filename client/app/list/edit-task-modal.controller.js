(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$modalInstance', '$scope', 'task', 'taskService'];

    function ModalController($modalInstance, $scope, task, taskService) {
        var vmModal = this;

        // Preventing the list to display the changes immediately
        vmModal.task = angular.copy(task);

        (function() {

        })();

        vmModal.save = function() {
            
            taskService
                .updateTask(vmModal.task)
                .then(function(response) {
                    $scope.$emit('task:updated', response.data);
                    $modalInstance.close();        
                });
        };

        vmModal.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
})();