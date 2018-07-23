/**
 * abDraftsV1Ctrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Controller for the drafts view version one
 */
(function () {
    "use strict";
    angular.module("abInboxV1", [])
        .controller("abDraftsCtrl", [
            "$scope", "$state", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $notification, config, abMailSvc, modalDialogs) {
                $scope.draftsHasChecked = 0;
                $scope.draftsIsChecked = false;
                $scope.drafts = [];
                abMailSvc.getDrafts().then(function (result) {
                    $scope.drafts = result;
                }).catch(function (error) {
                    $notification.error("Getting drafts failed with error: " + error, "Drafts", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckDraftsAll = function () {
                    var newVal = !$scope.draftsIsChecked;
                    angular.forEach($scope.drafts, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.draftsIsChecked = newVal;
                    if ($scope.draftsIsChecked) {
                        $scope.draftsHasChecked = $scope.drafts.length + 1;
                    } else {
                        $scope.sentHasChecked = 0;
                    }
                };
                $scope.updateDraftsChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.draftsHasChecked++;
                    } else {
                        $scope.draftsHasChecked--;
                    }
                };
                $scope.deleteDraftsChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected drafts ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmp = [];
                        angular.forEach($scope.drafts, function (mail) {
                            if (mail.isChecked) {
                                tmp.push(mail);
                            }
                        });
                        abMailSvc.deleteDraftsChecked(tmp).then(function (result) {
                            $scope.drafts = result;
                            $scope.draftsHasChecked = 0;
                            $notification.info("Drafts deleted !", "Drafts", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error("Deleting drafts failed with error: " + error, "Drafts", config.notificationDelay);
                        });
                    });
                };
                $scope.readSDraftsMail = function(mail) {
                    $state.go("outlookone.compose", { id: mail.id, view: "drafts" });
                };
            }]);
})();