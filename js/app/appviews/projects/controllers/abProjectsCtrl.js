/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Controller for the project list view
 */
(function () {
    "use strict";
    angular.module("ab.project.list", [
            []
        ])
        .controller("ProjectListController", ["$scope", "$notification", "config", "$state", "abProjectsSvc", "abProjectEnumsSvc",
            function ($scope, $notification, config, $state, abProjectsSvc, abProjectEnumsSvc) {
                // ngRepeat sort options
                $scope.sortType = "endDate"; // set the default sort type
                $scope.sortReverse = false; // set the default sort 

                $scope.projects = [];

                $scope.displayProject = function (id) {
                    $state.go("projectdetails", {
                        id: id,
                        action: abProjectEnumsSvc.actions.display
                    });
                };

                $scope.editProject = function (id) {
                    $state.go("projectdetails", {
                        id: id,
                        action: abProjectEnumsSvc.actions.edit
                    });
                };

                var getAll = function () {
                    abProjectsSvc.getAll().then(function (data) {
                        $scope.projects = data;
                        $scope.totalProjects = data.length;
                        $scope.isLoading = false;
                        if (config.debug) {
                            console.log("Projects");
                            console.log($scope.projects);
                            $notification.success("Projects loaded", "ABAdmin Projects", config.notificationDelay);
                        }
                    }).catch(function (message) {
                        $notification.error(message, "ABAdmin Projects", config.notificationDelay);
                    });
                }

                getAll();
            }
        ]);
})();