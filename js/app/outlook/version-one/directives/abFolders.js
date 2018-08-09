/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @summary Folder directive for inbox version one.
 */
(function () {
    "use strict";
    angular.module("abFolders", [["js/app/outlook/version-one/services/abMailSvc.js"]])
        .directive("folders", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/pages/outlook/version-one/folders.html",
                controller: ["$scope", "$rootScope", "abMailSvc", function ($scope, $rootScope, abMailSvc) {
                    $scope.counters = abMailSvc.getCounters();

                    $scope.lastFolder = "inbox";
                    // Updating active folder.
                    $scope.updateFolder = function (item) {
                        if ($scope.lastFolder === item) {
                            return;
                        }
                        $("#" + $scope.lastFolder).removeClass("active");
                        $("#" + item).addClass("active");
                        $scope.lastFolder = item;
                    }
                    // Updating the counters whenever the abMailSvc is updating one the folders there.
                    // ReSharper disable once AssignedValueIsNeverUsed
                    var updateCounterEvent = $scope.$on(abMailSvc.events.updateFoldersCount, function (event, args) {
                        $scope.counters = args;
                    });

                    $scope.$on(
                       "$destroy", function () {
                           updateCounterEvent = null;
                       }
                   );
                }]
            }
        });

}());