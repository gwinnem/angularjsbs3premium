/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Adding project task.
 */
(function () {
    "use strict";
    angular.module("ab.project.addtask", [["/js/app/appViews/projects/services/abProjectsSvc.js"]])
        .controller("addTaskController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions", "abProjectsSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abProjectsSvc) {
                $scope.modalOptions = modalOptions;
                $scope.status = abProjectsSvc.taskStatus;
                $scope.priority = abProjectsSvc.taskPriority;
                $scope.task = modalOptions.task;
                // Settings and init for datepicker directive
                $scope.format = "MMMM/dd/yyyy";
                $scope.altInputFormats = ['M!/d!/yyyy'];

                $scope.popup1 = {
                    opened: false
                };
                $scope.popup2 = {
                    opened: false
                };
                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };
                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                      mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1,
                    type: {
                        Config: "datetime-local"
                    }
                };
                $scope.ok = function () {
                    if (config.debug) {
                        console.log("Task");
                        console.log($scope.task);
                    }
                    abProjectsSvc.createTask($scope.task).then(function (result) {
                        if (result) {
                            $notification.success("Task successfully added!", "Project task", config.notificationDelay);
                            $uibModalInstance.close(true);
                        } else {
                            $notification.error("Failed to add task!", "Project task", config.notificationDelay);
                            $uibModalInstance.close(false);
                        }
                    }), function (message) {
                        $notification.error(message, "Project Task", config.notificationDelay);
                        $uibModalInstance.close(false);
                    };
                };


                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
                if (config.debug) {
                    $notification.success("addTaskController loaded", "Project Details", config.notificationDelay);
                }
            }
        ]);
})();