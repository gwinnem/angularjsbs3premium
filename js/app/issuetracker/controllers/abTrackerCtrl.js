/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Main issuetracker controller.
 */
(function () {
    "use strict";
    angular.module("abTrackerModule", [["js/app/issuetracker/controllers/abEditIssueCtrl.js"]])
        .controller("TrackerController", ["$scope", "$notification", "config", "abTrackerSvc", "$state",
            function ($scope, $notification, config, abTrackerSvc, $state) {


                // Issue details
                $scope.editIssue = function (issue) {
                    if (config.debug) {
                        console.log("issue details");
                        console.log(issue);
                    }
                    $state.go("issuedetail", { "id": issue.id });


                }
                $scope.issueList = abTrackerSvc.getIssues();
                if (config.debug) {
                    $notification.info("Issue list loaded", "Issue Tracker", config.notificationDelay);
                }
            }]);
})();
