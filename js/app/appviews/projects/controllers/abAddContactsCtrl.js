/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Adding project participants.
 */
(function () {
    "use strict";
    angular.module("abAddProjectContacts", [["js/app/appViews/projects/services/abProjectsSvc.js"]])
        .controller("addContactsController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions", "abProjectsSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abProjectsSvc) {
                $scope.modalOptions = modalOptions;
                $scope.ok = function () {
                    var contacts = [];
                    angular.forEach($scope.modalOptions.model, function (item) {
                        if (item.done) {
                            contacts.push(item.id);
                        }
                    });

                    var model = {
                        id: $scope.modalOptions.projectId,
                        contactsId: contacts.join()
                    }
                    if (contacts.length > 0) {
                        abProjectsSvc.addContacts(model)
                            .then(function (data) {
                                if (config.debug) {
                                    console.log("AddContacts data");
                                    console.log(data);
                                }
                            }), function (message) {
                                $notification.error(message, "Adding contacts", config.notificationDelay);
                            };
                    }
                    $uibModalInstance.close(true);
                };


                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
                if (config.debug) {
                    $notification.success("addParticipantsController loaded", "Project Details", config.notificationDelay);
                }
            }
        ]);
})();