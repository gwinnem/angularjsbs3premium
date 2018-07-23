/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Controller for composing email version one
 */
(function () {
    "use strict";
    angular.module("abComposeCtrl", [])
        .controller("abComposeCtrl", [
            "$scope", "$state", "$stateParams", "$notification", "config", "abMailSvc",
            function ($scope, $state, $stateParams, $notification, config, abMailSvc) {
                var returnTo = $stateParams.view;
                var id = $stateParams.id;
                $scope.emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                $scope.mail = {
                    id: abMailSvc.getGuid(),
                    created: new Date(),
                    from: "composer@abadmin.com",
                    hasAttachment: false,
                    isRead: true
                };
                if (id !== "0") {
                    // This a reply or forward so we have to load the original email.
                    switch (returnTo) {
                        case "inbox":
                            {
                                abMailSvc.getEmailFromInboxById(id).then(function (data) {
                                    $scope.mail = data;
                                    $scope.mail.subject = "RE: " + $scope.mail.subject;
                                    $scope.mail.created = Date();
                                    $scope.mail.received = $scope.mail.created;
                                    $scope.mail.message = "------------------------------------------------------------" +
                                        "FROM:" +
                                        "CREATED:" +
                                        "TO:" +
                                        "SUBJECT: " + $scope.mail.message;
                                    if (config.debug) {
                                        $notification.success("Email to: " + $scope.mail.email + " retrieved", "Reply to Email", config.notificationDelay);
                                    }
                                }).catch(function (message) {
                                    $notification.error(message, "Compose Email Error", config.notificationDelay);
                                });
                                break;
                            }
                        case "sent":
                            {
                                break;
                            }
                        case "drafts":
                            {
                                abMailSvc.getDraftById(id).then(function (data) {
                                    $scope.mail = data;
                                }).catch(function (message) {
                                    $notification.error(message, "Get draft Error", config.notificationDelay);
                                });
                                break;
                            }
                        case "spam":
                            {
                                break;
                            }
                        case "trash":
                            {
                                break;
                            }
                        case "archive":
                            {
                                break;
                            }
                        default:
                    }
                }

                var gotoFolder = function () {
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
                    }
                }


                $scope.sendEmail = function () {
                    if (!angular.isDefined($scope.mail.email) || $scope.mail.email.length === 0) {
                        $notification.warning("To address can not be empty", "Compose Email", config.notificationDelay);
                        return;
                    }
                    abMailSvc.sendEmail($scope.mail).then(function () {
                        $notification.success("Mail sent to: " + $scope.mail.to, "Compose Email", config.notificationDelay);
                        gotoFolder();
                    }).catch(function (message) {
                        $notification.error("Send Email failed with message: " + message, "Compose Email", config.notificationDelay);
                    });
                };

                $scope.cancelEmail = function () {
                    gotoFolder();
                };
                $scope.saveAsDraft = function (mail) {
                    if (mail.isDraft) {
                        gotoFolder();
                        return;
                    }
                    if ((mail.email === undefined || mail.email === "") && (mail.subject === undefined || mail.subject === "") && (mail.message === undefined || mail.message === "")) {
                        $notification.warning("It is not possible to save empty email as draft.", "Save as draft", config.notificationDelay);
                        return;
                    }
                    abMailSvc.saveAsDraft(mail).then(function () {
                        $notification.success("Mail saved as draft !", "Compose Email", config.notificationDelay);
                        gotoFolder();
                    }).catch(function (message) {
                        $notification.error("Send Email failed with message: " + message, "Compose Email", config.notificationDelay);
                    });
                }

                //Summernote options
                $scope.options = {
                    height: 300,
                    toolbar: [
                        ['edit', ['undo', 'redo']],
                        ['headline', ['style']],
                        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                        ['fontface', ['fontname']],
                        ['textsize', ['fontsize']],
                        ['fontclr', ['color']],
                        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                        ['height', ['height']],
                        ['table', ['table']],
                        ['insert', ['link', 'hr']],
                        ['view', ['codeview']],
                        ['help', ['help']]
                    ]
                };
            }]);
})();