/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Controller for the Inbox view version one
 */
(function () {
    "use strict";
    angular.module("outLookOneModule", [])
        .controller("abInboxCtrl", [
            "$scope", "$state", "$timeout", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $timeout, $notification, config, abMailSvc, modalDialogs) {
                $scope.inbox = [];
                $scope.inboxIsChecked = false;
                $scope.inboxHasChecked = 0;

                abMailSvc.getInbox().then(function (data) {
                    $scope.inbox = data;
                }).catch(function (error) {
                    $notification.error(message, "Getting inbox mails failed with error: " + error, "Inbox", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckInboxAll = function () {
                    var newVal = !$scope.inboxIsChecked;
                    angular.forEach($scope.inbox, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.inboxIsChecked = newVal;
                    if ($scope.inboxIsChecked) {
                        $scope.inboxHasChecked = $scope.inbox.length + 1;
                    } else {
                        $scope.inboxHasChecked = 0;
                    }
                }

                // Deleting all checked emails
                $scope.deleteInboxChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected emails ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmpinbox = [];
                        angular.forEach($scope.inbox, function (mail) {
                            if (mail.isChecked) {
                                $scope.inboxHasChecked--;
                                tmpinbox.push(mail);
                            }
                        });
                        abMailSvc.deleteFromInbox(tmpinbox).then(function (result) {
                            $scope.inboxHasChecked = 0;
                            $scope.inbox = result;
                            $notification.info("Email's moved to trash ! ", "Inbox", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error(message, "Deleting checked emails failed with error: " + error, "Inbox", config.notificationDelay);
                        });

                    });
                }

                // Helper function for mail checkbox
                $scope.updateInboxChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.inboxHasChecked++;
                        return;
                    }
                    $scope.inboxHasChecked--;
                    mail.isChecked = false;
                }

                $scope.composeMail = function () {
                    $state.go("outlookone.compose", { id: 0, view: $scope.lastFolder });
                }

                // Setting mail to read when mail subject is clicked in inboxView
                $scope.readInboxMail = function (mail) {
                    if (!mail.isRead) {
                        abMailSvc.markInboxMailAsRead(mail.id).then(function (result) {
                            if (result === abMailSvc.httpStatus.NoContent) {
                                mail.isRead = true;
                                $state.go("outlookone.readmail", { id: mail.id, view: "inbox" });
                            } else {
                                $notification.warn("Mark email as read service returned wrong code: " + result, "Inbox", config.notificationDelay);
                            }
                        }).catch(function (error) {
                            $notification.error("Mark email as read failed with error: " + error, "Inbox", config.notificationDelay);
                        });
                    } else {
                        $state.go("outlookone.readmail", { id: mail.id, view: "inbox" });
                    }

                }

                // Called by the delete icon shown when mouse hover over a mail
                $scope.deleteInboxMail = function (mail) {
                    abMailSvc.deleteFromInbox([mail]).then(function (result) {
                        if (mail.isChecked) {
                            mail.isChecked = false;
                            $scope.inboxHasChecked--;
                        }
                        $scope.inbox = result;
                        $notification.info("Mail moved to trash !", "Inbox", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.warn("Mail moved to trash failed with error: " + error, "Inbox", config.notificationDelay);
                    });
                }


                // Toggles email isFlagged
                $scope.flagEmail = function (mail) {
                    abMailSvc.updateFlagMailInbox(mail).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            // Updating local inbox
                            if (mail.isFlagged) {
                                mail.isFlagged = false;
                            } else {
                                mail.isFlagged = true;
                            }
                            $notification.info("Mail flagged updated !", "Inbox", config.notificationDelay);
                        } else {
                            $notification.warn("Mail flagged returned wrong status ! code: " + result, "Inbox", config.notificationDelay);
                        }
                    }).catch(function (error) {
                        $notification.error("Mail flagged Service failed with error: " + error, "Inbox", config.notificationDelay);
                    });
                }

                // Called by the archive icon shown when mouse hover over a mail
                $scope.archiveInboxMail = function (mail) {
                    mail.isChecked = false;
                    abMailSvc.archiveInbox([mail]).then(function (result) {
                        $scope.inbox = result;
                        $scope.inboxHasChecked = 0;
                        $notification.info("Email moved to archive !", "Inbox", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.error("Archiving email failed with error: " + error, "Inbox", config.notificationDelay);
                    });
                }

                // Archiving all checked emails.
                $scope.archiveInboxChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to archive selected emails ?", "Archive Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmp = [];
                        angular.forEach($scope.inbox, function (mail) {
                            if (mail.isChecked) {
                                mail.isChecked = false;
                                tmp.push(mail);
                            }
                        });
                        abMailSvc.archiveInbox(tmp).then(function (data) {
                            $scope.inbox = data;
                            $scope.inboxHasChecked = 0;
                            $notification.info("Emails moved to archive !", "Inbox", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error("Archiving emails failed with error: " + error, "Inbox", config.notificationDelay);
                        });


                    });
                }


                // Mark all checked mails as read
                $scope.markInboxCheckedAsRead = function () {
                    // Getting the checked mails before sending them to the mock service
                    var tmp = [];
                    angular.forEach($scope.inbox, function (item) {
                        if (item.isChecked) {
                            tmp.push(item.id);
                        }
                    });

                    abMailSvc.markInboxEmailsAsRead(tmp).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            // Updating local inbox
                            var index = -1;
                            angular.forEach(tmp, function (id) {
                                index = $scope.inbox.findIndex((obj => obj.id === id));
                                if (index < 0) {
                                    // something went wrong.
                                    $notification.warn("An error occured when trying to update mail as read !", "Inbox", config.notificationDelay);
                                    return;
                                } else {
                                    $scope.inbox[index].isRead = true;
                                    $scope.inbox[index].isChecked = false;
                                }
                            });
                            // Resetting to update button visibillity
                            $scope.inboxHasChecked = 0;
                            $scope.inboxIsChecked = false;
                            $notification.info("Marked email's as read completed !", "Inbox", config.notificationDelay);
                        } else {
                            $notification.error("Service returned wrong status ! Status Code: " + result, "Service error", config.notificationDelay);
                        };
                    }).catch(function (error) {
                        $notification.error("Mark as read failed with error: " + error, "Inbox", config.notificationDelay);
                    });
                }

                $scope.updateInboxStarred = function (mail) {
                    if (mail.isStarred) {
                        mail.isStarred = false;
                    } else {
                        mail.isStarred = true;
                    };
                    abMailSvc.updateInboxStarred(mail).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            $notification.info("Email starred success !", "Inbox", config.notificationDelay);
                        } else {
                            $notification.warn("Mail starred service returned wrong status code: " + result, "Inbox", config.notificationDelay);
                        }
                    }).catch(function (error) {
                        $notification.error("Mail starred Service failed: " + error, "Inbox", config.notificationDelay);
                    });
                }
            }]);
})();