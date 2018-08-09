/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Controller for the Archive view version one
 */
(function () {
    "use strict";
    angular.module("outLookOneModule", [])
        .controller("abArchiveCtrl", [
            "$scope", "$state", "$timeout", "$notification", "config", "abMailSvc", "modalDialogs",
            function ($scope, $state, $timeout, $notification, config, abMailSvc, modalDialogs) {
                $scope.archive = [];
                $scope.archiveIsChecked = false;
                $scope.archiveHasChecked = 0;

                abMailSvc.getArchive().then(function (data) {
                    $scope.archive = data;
                }).catch(function (error) {
                    $notification.error(message, "Getting archive mails failed with error: " + error, "Archive", config.notificationDelay);
                });

                // Helper function for select all toggle button
                $scope.toggleCheckArchiveAll = function () {
                    var newVal = !$scope.archiveIsChecked;
                    angular.forEach($scope.archive, function (mail) {
                        mail.isChecked = newVal;
                    });

                    $scope.archiveIsChecked = newVal;
                    if ($scope.archiveIsChecked) {
                        $scope.archiveHasChecked = $scope.archive.length + 1;
                    } else {
                        $scope.archiveHasChecked = 0;
                    }
                }
                // Deleting all checked emails
                $scope.deleteArchiveChecked = function () {
                    modalDialogs.openConfirmDialog("Do you really want to delete selected emails ?", "Delete Confirmation").then(function (result) {
                        if (!result) {
                            return;
                        }
                        var tmp = [];
                        angular.forEach($scope.archive, function (mail) {
                            if (mail.isChecked) {
                                $scope.archiveHasChecked--;
                                tmp.push(mail);
                            }
                        });
                        abMailSvc.deleteFromArchive(tmp).then(function (result) {
                            $scope.archiveHasChecked = 0;
                            $scope.archive = result;
                            $notification.info("Email's moved to trash ! ", "Archive", config.notificationDelay);
                        }).catch(function (error) {
                            $notification.error(message, "Deleting checked emails failed with error: " + error, "Archive", config.notificationDelay);
                        });

                    });
                }
                // Helper function for mail checkbox
                $scope.updateArchiveChecked = function (mail) {
                    if (mail.isChecked) {
                        $scope.archiveHasChecked++;
                        return;
                    }
                    $scope.archiveHasChecked--;
                    mail.isChecked = false;
                }
                // Setting mail to read when mail subject is clicked in archive view
                $scope.readArchiveMail = function (mail) {
                    if (!mail.isRead) {
                        abMailSvc.markArchiveMailAsRead([mail]).then(function (result) {
                            if (result === abMailSvc.httpStatus.NoContent) {
                                mail.isRead = true;
                                $state.go("outlookone.readmail", { id: mail.id, view: "archive" });
                            } else {
                                $notification.warn("Mark email as read service returned wrong code: " + result, "Archive", config.notificationDelay);
                            }
                        }).catch(function (error) {
                            $notification.error("Mark email as read failed with error: " + error, "Archive", config.notificationDelay);
                        });
                    } else {
                        $state.go("outlookone.readmail", { id: mail.id, view: "archive" });
                    }

                }
                // Called by the delete icon shown when mouse hover over a mail
                $scope.deleteArchiveMail = function (mail) {
                    abMailSvc.deleteFromArchive([mail]).then(function (result) {
                        if (mail.isChecked) {
                            mail.isChecked = false;
                            $scope.archiveHasChecked--;
                        }
                        $scope.archive = result;
                        $notification.info("Mail moved to trash !", "Archive", config.notificationDelay);
                    }).catch(function (error) {
                        $notification.warn("Mail moved to trash failed with error: " + error, "Archive", config.notificationDelay);
                    });

                }
                // Toggles email isFlagged
                $scope.flagArchiveEmail = function (mail) {
                    abMailSvc.updateFlagMailArchive(mail).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            // Updating local archive
                            if (mail.isFlagged) {
                                mail.isFlagged = false;
                            } else {
                                mail.isFlagged = true;
                            }
                            $notification.info("Mail flagged updated !", "Archive", config.notificationDelay);
                        } else {
                            $notification.warn("Mail flagged returned wrong status ! code: " + result, "Archive", config.notificationDelay);
                        }
                    }).catch(function (error) {
                        $notification.error("Mail flagged Service failed with error: " + error, "Archive", config.notificationDelay);
                    });
                };
                // Mark all checked mails as read
                $scope.markArchiveCheckedAsRead = function () {
                    // Getting the checked mails before sending them to the mock service
                    var tmp = [];
                    angular.forEach($scope.archive, function (item) {
                        if (item.isChecked) {
                            tmp.push(item);
                        }
                    });

                    abMailSvc.markArchiveMailAsRead(tmp).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            // Updating local inbox
                            var index = -1;
                            angular.forEach(tmp, function (item) {
                                index = $scope.archive.findIndex((obj => obj.id === item.id));
                                if (index < 0) {
                                    // something went wrong.
                                    $notification.warn("An error occured when trying to update mail as read !", "Inbox", config.notificationDelay);
                                    return;
                                } else {
                                    $scope.archive[index].isRead = true;
                                    $scope.archive[index].isChecked = false;
                                }
                            });
                            // Resetting to update button visibillity
                            $scope.archiveHasChecked = 0;
                            $notification.info("Marked email's as read completed !", "Archive", config.notificationDelay);
                        } else {
                            $notification.error("Service returned wrong status ! Status Code: " + result, "Service error", config.notificationDelay);
                        };
                    }).catch(function (error) {
                        $notification.error("Mark as read failed with error: " + error, "Archive", config.notificationDelay);
                    });
                }
                $scope.updateArchiveStarred = function (mail) {
                    if (mail.isStarred) {
                        mail.isStarred = false;
                    } else {
                        mail.isStarred = true;
                    };
                    abMailSvc.updateArchiveStarred(mail).then(function (result) {
                        if (result === abMailSvc.httpStatus.NoContent) {
                            $notification.info("Email starred success !", "Archive", config.notificationDelay);
                        } else {
                            $notification.warn("Mail starred service returned wrong status code: " + result, "Archive", config.notificationDelay);
                        }
                    }).catch(function (error) {
                        $notification.error("Mail starred Service failed: " + error, "Archive", config.notificationDelay);
                    });
                }



                $scope.composeMail = function () {
                    $state.go("outlookone.compose");
                }
            }]);
})();