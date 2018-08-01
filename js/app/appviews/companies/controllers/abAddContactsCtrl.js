/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary
 */
(function () {
    "use strict";
    angular.module("abAddProjectContacts", [["js/app/appViews/companies/services/abCompaniesSvc.js"]])
        .controller("addContactsController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions", "abCompaniesSvc",
            function ($scope, $notification, config, $uibModalInstance, modalOptions, abCompaniesSvc) {
                debugger;
                $scope.modalOptions = modalOptions;
                $scope.ok = function () {
                    var contacts = [];
                    angular.forEach($scope.modalOptions.model, function (item) {
                        if (item.done) {
                            contacts.push(item.id);
                        }
                    });

                    var model = {
                        id: $scope.modalOptions.companyId,
                        contactsId: contacts.join()
                    }
                    if (contacts.length > 0) {
                        abCompaniesSvc.addCompanyContacts(model)
                            .then(function (result) {
                                if (config.debug) {
                                    console.log("addCompanyContacts: " + result);
                                }
                            }), function (message) {
                                $notification.error(message, "addCompanyContacts error", config.notificationDelay);
                            };
                    }
                    $uibModalInstance.close(true, $scope.modalOptions.model);
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
