/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying contacts lists
 */
(function () {
    "use strict";
    angular.module("abContactsModule", [
            []
        ])
        .controller("ContactsController", ["$scope", "$notification", "abContactsSvc", "$state", "config",
            function ($scope, $notification, abContactsSvc, $state, config) {

                abContactsSvc.getAllContacts().then(function (data) {
                    $scope.contacts = data;
                    if (config.debug) {
                        console.log("Contacts");
                        console.log(data);
                    }
                }).catch(function (message) {
                    $notification.warning(message, "AppView Contacts", config.notificationDelay);
                });

                $scope.displayContact = function (contactId, returnView) {
                    $state.go("contactdetailsv1", {
                        id: contactId,
                        type: abContactsSvc.actions.edit,
                        return: returnView
                    });
                }
                if (config.debug) {
                    $notification.info("Contacts loaded", "AppView Contacts", config.notificationDelay);
                }
            }
        ]);
})();