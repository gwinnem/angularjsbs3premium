/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Getting emails to display.
 */
(function () {
    "use strict";
    angular.module("abInboxV1", [["js/app/outlook/version-one/services/abMailSvc.js"]])
        .controller("abReadEmailCtrl", [
            "$scope", "$state", "$notification", "config", "abMailSvc", "$stateParams",
            function ($scope, $state, $notification, config, abMailSvc, $stateParams) {
                $scope.canReply = true;
                var returnTo = $stateParams.view;
                var id = $stateParams.id;
                switch ($stateParams.view) {
                    case "inbox":
                        {
                            $scope.canReply = true;
                            abMailSvc.getEmailFromInboxById(id).then(function (data) {
                                $scope.mail = data;
                            }).catch(function (error) {
                                $notification.error(message, "Getting email failed with error: " + error, "Read Email", config.notificationDelay);
                            });

                            break;
                        }
                    case "sent":
                        {
                            abMailSvc.getEmailFromSentById(id).then(function (data) {
                                $scope.mail = data;
                            }).catch(function (error) {
                                $notification.error(message, "Getting email failed with error: " + error, "Read Email", config.notificationDelay);
                            });
                            $scope.canReply = false;
                            break;
                        }
                    case "drafts": { break; }
                    case "spam":
                        {
                            $scope.canReply = false;
                            abMailSvc.getEmailFromSpamById(id).then(function (data) {
                                $scope.mail = data;
                            }).catch(function (error) {
                                $notification.error(message, "Getting email failed with error: " + error, "Read Email", config.notificationDelay);
                            });
                            break;
                        }
                    case "trash":
                        {
                            $scope.canReply = true;
                            abMailSvc.getEmailFromTrashById(id).then(function (data) {
                                $scope.mail = data;
                            }).catch(function (error) {
                                $notification.error(message, "Getting email failed with error: " + error, "Read Email", config.notificationDelay);
                            });
                            $scope.canReply = false;
                            break;
                        }
                    case "archive":
                        {
                            $scope.canReply = true;
                            abMailSvc.getEmailFromArchiveById(id).then(function (data) {
                                $scope.mail = data;
                            }).catch(function (error) {
                                $notification.error(message, "Getting email failed with error: " + error, "Read Email", config.notificationDelay);
                            });
                            break;
                        }

                    default:
                };

                $scope.readMailDelete = function (mail) {
                    switch ($stateParams.view) {
                        case "inbox":
                            {
                                abMailSvc.deleteFromInbox([mail]).then(function (data) {
                                    $scope.mail = null;
                                }).catch(function (error) {
                                    $notification.error(message, "Deleting email failed with error: " + error, "Read Email", config.notificationDelay);
                                });
                                $state.go("outlookone", null, { reload: true });
                                break;
                            }
                        case "sent":
                            {
                                abMailSvc.deleteSent([mail]).then(function (data) {
                                    $scope.mail = null;
                                }).catch(function (error) {
                                    $notification.error(message, "Deleting email failed with error: " + error, "Read Email", config.notificationDelay);
                                });
                                $state.go("outlookone.sentview", null, { reload: true });
                                break;
                            }
                        case "drafts": { break; }
                        case "spam":
                            {
                                abMailSvc.deleteFromSpam([mail]).then(function (data) {
                                    $scope.mail = null;
                                }).catch(function (error) {
                                    $notification.error(message, "Deleting email failed with error: " + error, "Read Email", config.notificationDelay);
                                });
                                $state.go("outlookone.spamview", null, { reload: true });
                                break;
                                break;
                            }
                        case "trash":
                            {
                                abMailSvc.deleteFromTrash([mail]).then(function (data) {
                                    $scope.mail = null;
                                }).catch(function (error) {
                                    $notification.error(message, "Deleting email failed with error: " + error, "Read Email", config.notificationDelay);
                                });
                                $state.go("outlookone.trashview", null, { reload: true });
                                break;
                            }
                        case "archive":
                            {
                                abMailSvc.deleteFromArchive([mail]).then(function (data) {
                                    $scope.mail = null;
                                }).catch(function (error) {
                                    $notification.error(message, "Deleting email failed with error: " + error, "Read Email", config.notificationDelay);
                                });
                                $state.go("outlookone.archiveview", null, { reload: true });
                                break;
                            }

                        default:
                    };
                };
                $scope.readMailCancel = function () {
                    switch (returnTo) {
                        case "inbox":
                            {
                                $state.go("outlookone");
                                break;
                            }
                        case "sent":
                            {
                                $state.go("outlookone.sentview");
                                break;
                            }
                        case "drafts":
                            {
                                $state.go("outlookone.draftsview");
                                break;
                            }
                        case "spam":
                            {
                                $state.go("outlookone.spamview");
                                break;
                            }
                        case "trash":
                            {
                                $state.go("outlookone.trashview");
                                break;
                            }
                        case "archive":
                            {
                                $state.go("outlookone.archiveview");
                                break;
                            }
                        default:
                            $state.go("emailinbox");

                    }
                };
                $scope.readMailReply = function (id) {
                    $state.go("outlookone.compose", { id: id, view: returnTo });
                };
                $scope.readMailForward = function (id) { };

            }]);
})();