/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Controller for the Spam view version one
 */
(function () {
    "use strict";
    angular.module("abInboxV1", [])
        .controller("abSpamCtrl", [
            "$scope", "$state", "$timeout", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $timeout, $notification, config, abMailSvc, modalDialogs) {
                $scope.spam = [];
                $scope.spamIsChecked = false;
                $scope.spamHasChecked = 0;

                abMailSvc.getSpam().then(function (data) {
                    $scope.spam = data;
                }).catch(function (error) {
                    $notification.error(message, "Getting spam mails failed with error: " + error, "Spam", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckSpamAll = function () {
                    var newVal = !$scope.spamIsChecked;
                    angular.forEach($scope.spam, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.spamIsChecked = newVal;
                    if ($scope.spamIsChecked) {
                        $scope.spamHasChecked = $scope.spam.length + 1;
                    } else {
                        $scope.spamHasChecked = 0;
                    }
                }

                // Deleting all checked emails
                $scope.deleteSpamChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected emails ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmpspam = [];
                        angular.forEach($scope.spam, function (mail) {
                            if (mail.isChecked) {
                                $scope.spamHasChecked--;
                                tmpspam.push(mail);
                            }
                        });
                        abMailSvc.deleteFromSpam(tmpspam).then(function (result) {
                            $scope.spamHasChecked = 0;
                            $scope.spam = result;
                            $notification.info("Email's moved to trash ! ", "Spam", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error(message, "Deleting checked emails failed with error: " + error, "Spam", config.notificationDelay);
                        });

                    });
                }

                // Helper function for mail checkbox
                $scope.updateSpamChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.spamHasChecked++;
                        return;
                    }
                    $scope.spamHasChecked--;
                    mail.isChecked = false;
                }

                // Setting mail to read when mail subject is clicked in spamView
                $scope.readSpamMail = function (mail) {
                    if (!mail.isRead) {
                        abMailSvc.markspamMailAsRead(mail).then(function (result) {
                            if (result === abMailSvc.httpStatus.NoContent) {
                                mail.isRead = true;
                                $state.go("outlookone.readmail", { id: mail.id, view: "spam" });
                            } else {
                                $notification.warn("Mark email as read service returned wrong code: " + result, "Spam", config.notificationDelay);
                            }
                        }).catch(function (error) {
                            $notification.error("Mark email as read failed with error: " + error, "Spam", config.notificationDelay);
                        });
                    } else {
                        $state.go("outlookone.readmail", { id: mail.id, view: "spam" });
                    }

                }

                // Called by the delete icon shown when mouse hover over a mail
                $scope.deleteSpamMail = function (mail) {
                    abMailSvc.deleteFromSpam([mail]).then(function (result) {
                        if (mail.isChecked) {
                            mail.isChecked = false;
                            $scope.spamHasChecked--;
                        }
                        $scope.spam = result;
                        $notification.info("Mail moved to trash !", "Spam", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.warn("Mail moved to trash failed with error: " + error, "Spam", config.notificationDelay);
                    });
                }

                $scope.moveToInboxSpamChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to move selected emails to the inbox?", "Move to Inbox Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmpspam = [];
                        angular.forEach($scope.spam, function (mail) {
                            if (mail.isChecked) {
                                $scope.spamHasChecked--;
                                tmpspam.push(mail);
                            }
                        });
                        abMailSvc.moveSpamToInbox(tmpspam).then(function (result) {
                            $scope.spamHasChecked = 0;
                            $scope.spam = result;
                            $notification.info("Email's moved to inbox ! ", "Spam", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error(message, "Moving checked emails failed with error: " + error, "Spam", config.notificationDelay);
                        });

                    });
                };

                // Mark all checked mails as read
                $scope.markSpamCheckedAsRead = function () {
                    // Getting the checked mails before sending them to the mock service
                    var tmp = [];
                    angular.forEach($scope.spam, function (item) {
                        if (item.isChecked) {
                            tmp.push(item.id);
                        }
                    });

                    abMailSvc.markSpamEmailsAsRead(tmp).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            // Updating local spam
                            var index = -1;
                            angular.forEach(tmp, function (id) {
                                index = $scope.spam.findIndex((obj => obj.id === id));
                                if (index < 0) {
                                    // something went wrong.
                                    $notification.warn("An error occured when trying to update mail as read !", "Spam", config.notificationDelay);
                                    return;
                                } else {
                                    $scope.spam[index].isRead = true;
                                    $scope.spam[index].isChecked = false;
                                }
                            });
                            // Resetting to update button visibillity
                            $scope.inboxHasChecked = 0;
                            $notification.info("Marked email's as read completed !", "Inbox", config.notificationDelay);
                        } else {
                            $notification.error("Service returned wrong status ! Status Code: " + result, "Service error", config.notificationDelay);
                        };
                    }).catch(function (error) {
                        $notification.error("Mark as read failed with error: " + error, "Spam", config.notificationDelay);
                    });
                }
            }]);
})();