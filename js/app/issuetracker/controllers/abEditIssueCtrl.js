/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary
 */
(function () {
    "use strict";
    angular.module("IssueDetailsModule", [[]])
        .controller("EditIssueController", ["$scope", "$notification", "config", "$stateParams", "abTrackerSvc",
            function ($scope, $notification, config, $stateParams, abTrackerSvc) {

                $scope.issue = abTrackerSvc.getIssueById($stateParams.id);

                if (config.debug) {
                    console.log("Loading issue: " + $stateParams.id);
                    console.log($scope.issue);
                    $notification.success("Details loaded", "Tracker", config.notificationDelay);
                }
            }]);
})();
