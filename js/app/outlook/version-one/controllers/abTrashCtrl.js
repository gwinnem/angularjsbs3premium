/**
 * abTrashV1Ctrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Controller for the Trash view version one
 */
(function () {
    "use strict";
    angular.module("abInboxV1", [])
        .controller("abTrashCtrl", [
            "$scope", "$state", "$timeout", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $timeout, $notification, config, abMailSvc, modalDialogs) {
                $scope.trash = [];
                $scope.trashIsChecked = false;
                $scope.trashHasChecked = 0;

                abMailSvc.getTrash().then(function (data) {
                    $scope.trash = data;
                }).catch(function (error) {
                    $notification.error(message, "Getting trash mails failed with error: " + error, "Trash", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckTrashAll = function () {
                    var newVal = !$scope.trashIsChecked;
                    angular.forEach($scope.trash, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.trashIsChecked = newVal;
                    if ($scope.trashIsChecked) {
                        $scope.trashHasChecked = $scope.trash.length + 1;
                    } else {
                        $scope.trashHasChecked = 0;
                    }
                };

                // Deleting all checked emails
                $scope.deleteTrashChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected emails ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmptrash = [];
                        angular.forEach($scope.trash, function (mail) {
                            if (mail.isChecked) {
                                $scope.trashHasChecked--;
                                tmptrash.push(mail);
                            }
                        });
                        abMailSvc.deleteFromTrash(tmptrash).then(function (result) {
                            $scope.trashHasChecked = 0;
                            $scope.trash = result;
                            $notification.info("Email's deleted forever ! ", "Trash", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error(message, "Deleting checked emails failed with error: " + error, "Trash", config.notificationDelay);
                        });

                    });
                };

                // Helper function for mail checkbox
                $scope.updateTrashChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.trashHasChecked++;
                        return;
                    }
                    $scope.trashHasChecked--;
                    mail.isChecked = false;
                };

                $scope.readTrashMail = function (mail) {
                    if (!mail.isRead) {
                        abMailSvc.markTrashMailAsRead(mail).then(function (result) {
                            if (result === abMailSvc.httpStatus.NoContent) {
                                mail.isRead = true;
                                $state.go("outlookone.readmail", { id: mail.id, view: "trash" });
                            } else {
                                $notification.warn("Mark email as read service returned wrong code: " + result, "Trash", config.notificationDelay);
                            };
                        }).catch(function (error) {
                            $notification.error("Mark email as read failed with error: " + error, "Trash", config.notificationDelay);
                        });
                    }
                    else {
                        $state.go("outlookone.readmail", { id: mail.id, view: "trash" });
                    };
                };


                $scope.composeMail = function () {
                    $state.go("outlookone.compose");
                };

                // Called by the delete icon shown when mouse hover over a mail
                //$scope.deleteInboxMail = function (mail) {
                //    abMailSvc.deleteFromInbox([mail]).then(function (result) {
                //        if (mail.isChecked) {
                //            mail.isChecked = false;
                //            $scope.inboxHasChecked--;
                //        }
                //        $scope.inbox = result;
                //        $notification.info("Mail moved to trash !", "Inbox", config.notificationDelay);
                //    }).catch(function (error) {
                //        $notification.warn("Mail moved to trash failed with error: " + error, "Inbox", config.notificationDelay);
                //    });
                //}


            }]);
})();