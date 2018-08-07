/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Adding contacts to a company.
 */
(function () {
    "use strict";
    angular.module("ab.company.details.addcontacts", [
       //"/js/app/appviews/contacts/services/abContactsSvc.js"
    ])
        .controller("addContactsController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions", "abContactsSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abContactsSvc) {
                debugger;
                if(config.debug){
                    console.log("addContactsController loaded");
                }
                $scope.company = modalOptions.company;
                debugger;
                abContactsSvc.getContactsNoCompany().then(function (data) {
                    $scope.contacts = data;
                }).catch(function (error) {
                    $notification.error(error, "Not able to get contact list");
                });
                $scope.ok = function () {
                    var contacts = [];
                    // angular.forEach($scope.modalOptions.model, function (item) {
                    //     if (item.done) {
                    //         contacts.push(item.id);
                    //     }
                    // });

                    var model = {
                        id: $scope.company.id,
                        contactsId: contacts.join()
                    }
                    if (contacts.length > 0) {
                        abCompaniesSvc.addCompanyContacts(model)
                            .then(function (result) {
                                if (config.debug) {
                                    console.log("addCompanyContacts: " + result);
                                }
                            }),
                            function (message) {
                                $notification.error(message, "addCompanyContacts error", config.notificationDelay);
                            };
                    }
                    $uibModalInstance.close(true, $scope.company);
                };


                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };

                if (config.debug) {
                    $notification.success("AddContacts loaded", "Company details", config.notificationDelay);
                }
            }
        ]);
})();