/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.coM
 * @summary Crud operations for the CompanyDetails
 */
(function () {
    "use strict";
    angular.module("ab.company.details", [
            []
        ])
        .controller("CompanyDetailsController", ["$scope", "$notification", "config", "abCompaniesSvc", "$stateParams", "abHelpersSvc", "$state",
            function ($scope, $notification, config, abCompaniesSvc, $stateParams, abHelpersSvc, $state) {
                if (config.debug) {
                    console.info("$stateParams");
                    console.log($stateParams);
                }
                $scope.company = {
                    status: 1,
                    country: "",
                    contacts: []
                };
                $scope.contacts = [];

                $scope.editMode = false;
                $scope.guid = "";
                abHelpersSvc.getCountries().then(function (data) {
                    $scope.countries = data;
                    if (config.debug) {
                        $notification.success("Country list loaded", "AppView Company Details", config.notificationDelay);
                    }
                }).catch(function (error) {
                    $notification.error(error, "AppView Company Details", config.notificationDelay);
                });

                switch (parseInt($stateParams.action)) {
                    case abCompaniesSvc.actions.create:
                        {
                            $scope.guid = abHelpersSvc.getNewGuid();
                            $scope.company.id=$scope.guid;
                            $scope.boxTitle = "Create new company";
                            $scope.editMode = true;
                            break;
                        }
                    case abCompaniesSvc.actions.display:
                        {
                            $scope.boxTitle = "Display company details";
                            $scope.editMode = false;
                            abCompaniesSvc.getDetails($stateParams.id).then(function (data) {
                                $scope.company = data;
                            }).catch(function (message) {
                                $notification.error("Error loading details: " + message, "AppView Company Details", config.notificationDelay);
                            });
                            $scope.guid = $scope.company.id;
                            $scope.selectedCountry = {
                                niceName: $scope.company.country,
                                id: $scope.company.countryId
                            };
                            break;
                        }
                    case abCompaniesSvc.actions.edit:
                        {
                            $scope.boxTitle = "Edit company details";
                            $scope.editMode = true;
                            abCompaniesSvc.getDetails($stateParams.id).then(function (data) {
                                $scope.company = data;
                                if (config.debug) {
                                    console.log("Company details");
                                    console.log($scope.company);
                                }
                            }).catch(function (message) {
                                $notification.error("Error loading details: " + message, "AppView Company Details", config.notificationDelay);
                            });
                            $scope.guid = "";
                            $scope.selectedCountry = {
                                niceName: $scope.company.country,
                                id: $scope.company.countryId
                            };
                            break;
                        }
                }


                $scope.onStatusChange = function () {
                    if ($scope.company.status === abCompaniesSvc.companyStatus.inactive) {
                        $notification.warning("This will hide all contacts for this company in the Project views.", "Company");
                    }
                };

                $scope.cancel = function () {
                    $state.go("companylistv2");
                };

                $scope.save = function (item) {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.delete = function () {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.edit = function () {
                    $scope.editMode = true;
                };

                $scope.addContacts = function () {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.removeContact = function (id) {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.displayContact = function (contactId) {
                    $state.go("contactdetails", {
                        id: contactId
                    });
                };

                if (config.debug) {
                    $notification.success("Company Details loaded", "ABAdmin Companies", config.notificationDelay);
                }
            }
        ]);
})();