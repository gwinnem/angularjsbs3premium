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
        .controller("addContactsController", ["$scope", "$notification", "config", "$uibModalInstance",
            "modalOptions", "abProjectsSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abProjectsSvc) {
                $scope.modalOptions = modalOptions;
                $scope.project = angular.copy(modalOptions.project);
                $scope.ok = function () {
                    abProjectsSvc.addContacts($scope.project)
                        .then(function () {
                            $uibModalInstance.close(true);
                        })
                        .catch(function (error) {
                            $notification.error(error, "Add contacts failed!", config.notificationDelay);
                        });
                    $uibModalInstance.close(true);
                };
                $scope.addContacts = function (contact) {
                    if (contact.checked) {
                        $scope.project.contacts.push(contact);
                    } else {
                        var index = $scope.project.contacts.findIndex(obj => obj.id === contact.id);
                        if (index !== null && index !== undefined) {
                            $scope.project.contacts.splice(index, 1);
                        } else {
                            $notification.error("Failed to update contact list", "Project Contacts", config.notificationDelay);
                        }
                    };
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