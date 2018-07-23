/**
 * abSentV1Ctrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Controller for the sent view version one
 */
(function () {
    "use strict";
    angular.module("abInboxV1", [])
        .controller("abSentCtrl", [
            "$scope", "$state", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $notification, config, abMailSvc, modalDialogs) {
                $scope.sentHasChecked = 0;
                $scope.sentIsChecked = false;
                $scope.sent = [];
                abMailSvc.getSent().then(function (result) {
                    $scope.sent = result;
                }).catch(function (error) {
                    $notification.error("Getting sent mails failed with error: " + error, "Sent", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckSentAll = function () {
                    var newVal = !$scope.sentIsChecked;
                    angular.forEach($scope.sent, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.sentIsChecked = newVal;
                    if ($scope.sentIsChecked) {
                        $scope.sentHasChecked = $scope.sent.length + 1;
                    } else {
                        $scope.sentHasChecked = 0;
                    }
                };
                $scope.updateSentChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.sentHasChecked++;
                    } else {
                        $scope.sentHasChecked--;
                    }
                };
                $scope.archiveSentChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to archive selected emails ?", "Archive Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmp = [];
                        angular.forEach($scope.sent, function (mail) {
                            if (mail.isChecked) {
                                mail.isChecked = false;
                                tmp.push(mail);
                            }
                        });
                        abMailSvc.archiveSent(tmp).then(function (result) {
                            $scope.sent = result;
                            $scope.sentHasChecked = 0;
                            $notification.info("Emails moved to archive !", "Inbox", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error("Archiving emails failed with error: " + error, "Inbox", config.notificationDelay);
                        });
                    });
                };
                $scope.deleteSentChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected emails ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmp = [];
                        angular.forEach($scope.sent, function (mail) {
                            if (mail.isChecked) {
                                mail.isChecked = false;
                                tmp.push(mail);
                            }
                        });
                        abMailSvc.deleteSent(tmp).then(function (result) {
                            $scope.sent = result;
                            $scope.sentHasChecked = 0;
                            $notification.info("Emails deleted !", "Sent", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error("Deleting emails failed with error: " + error, "Sent", config.notificationDelay);
                        });
                    });
                };
                $scope.archiveSentMail = function (mail) {
                    mail.isChecked = false;
                    abMailSvc.archiveSent([mail]).then(function (result) {
                        $scope.sent = result;
                        $scope.sentHasChecked = 0;
                        $notification.info("Email moved to archive !", "Sent", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.error("Archiving email failed with error: " + error, "Sent", config.notificationDelay);
                    });
                };
                $scope.deleteSentMail = function (mail) {
                    abMailSvc.deleteSent([mail]).then(function (result) {
                        $scope.sent = result;
                        $notification.info("Mail moved to trash !", "Sent", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.warn("Mail moved to trash failed with error: " + error, "Sent", config.notificationDelay);
                    });
                };
                $scope.readSentMail = function (mail) {
                    $state.go("outlookone.readmail", { id: mail.id, view: "sent" });
                };
            }]);
})();