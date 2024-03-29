﻿/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Adding project task.
 */
(function () {
    "use strict";
    angular.module("ab.project.edittask", [["js/app/appViews/projects/services/abProjectsSvc.js"]])
        .controller("EditTaskController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions", "abProjectsSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abProjectsSvc) {
                $scope.modalOptions = modalOptions;
                $scope.project = modalOptions.project;
                $scope.status = abProjectsSvc.taskStatus;
                $scope.priority = abProjectsSvc.taskPriority;
                $scope.task = modalOptions.task;
                // Convert task start and end date so the directive displays them properly.
                $scope.task.startDate = new Date($scope.task.startDate);
                $scope.task.endDate = new Date($scope.task.endDate);

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

                    abProjectsSvc.updateTask($scope.project, $scope.task).then(function (result) {
                        if (result) {
                            $notification.success("Task successfully updated!", "Project task", config.notificationDelay);
                            $uibModalInstance.close(true);
                        } else {
                            $notification.error("Failed to update task!", "Project task", config.notificationDelay);
                            $uibModalInstance.close(false);
                        }
                    }).catch(function (error) {
                        $notification.error(error, "Project Task", config.notificationDelay);
                        $uibModalInstance.close(false);
                    });
                };


                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
                if (config.debug) {
                    $notification.success("EditTaskController loaded", "Project Details", config.notificationDelay);
                }
            }
        ]);
})();