/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Crud operations for the CompanyDetails
 */
(function () {
    "use strict";
    angular.module("ab.company.details", [])
        .controller("CompanyDetailsController", ["$scope", "$notification", "config", "abCompaniesSvc", "$stateParams", "abHelpersSvc",
            "$state", "modalDialogs",
            function ($scope, $notification, config, abCompaniesSvc, $stateParams, abHelpersSvc, $state, modalDialogs) {
                if (config.debug) {
                    console.info("$stateParams");
                    console.log($stateParams);
                }
                var returnView = $stateParams.view;
                $scope.company = {
                    status: abCompaniesSvc.companyStatus.active,
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
                            $scope.company.id = $scope.guid;
                            $scope.boxTitle = "Create new company";
                            $scope.editMode = true;
                            $scope.action = abCompaniesSvc.actions.create;
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
                            $scope.action = abCompaniesSvc.actions.edit;
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
                    $state.go(returnView);

                };

                $scope.save = function () {
                    abCompaniesSvc.saveDetails($scope.company, $scope.action).then(function (data) {
                        $scope.company = data;
                        $state.go(returnView);
                    }).catch(function (error) {
                        $notification.error(error, "Contact details save failed.", config.notificationDelay);
                    });
                };

                $scope.delete = function (id) {
                    $scope.company = [];
                    abCompaniesSvc.deleteCompany(id).then(function (data) {
                        if (config.debug) {
                            console.log("Delete Company");
                            console.log(data);
                            $notification.success("Delete success", "Company delete", config.notificationDelay);
                        }

                        $state.go(returnView);
                    }).catch(function (error) {
                        $notification.error(error, "Contact details save failed.", config.notificationDelay);
                    });;
                };

                $scope.edit = function () {
                    $scope.editMode = true;
                };

                $scope.addContacts = function () {
                    var modalDefaults = {
                        controller: "addContactsController",
                        size: ""
                    };
                    var modalOptions = {
                        company: $scope.company,
                        headerText: "Add Company Contacts",
                        hideOkButton: false,
                        contentUrl: "js/app/appviews/companies/templates/addContacts.html"
                    };

                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        debugger;
                        if (result) {
                            // $timeout(function () {
                            //     // getCompanyContacts();
                            // }, 100);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                $scope.removeContact = function (id) {
                    modalDialogs.openConfirmDialog("Do you really want to remove this contact?", "Remove contact")
                        .then(function (result) {
                            if (result) {
                                service.removeCompanyContact({
                                    id: $scope.company.id,
                                    contactId: id
                                })
                                    .then(function (data) {
                                        if (config.debug) {
                                            console.log(data);
                                        }
                                        $notification.success("Contact removed from company", "Success!", config.notificationDelay);
                                    }, function (message) {
                                        if (config.debug) {
                                            console.log("removeContact");
                                            console.log(message);
                                        }
                                        $notification.error(message, "RemoveContact", config.notificationDelay);
                                    });
                                getCompanyContacts();
                            }
                        });
                }

                $scope.displayContact = function (contactId) {
                    $state.go("contactdetails", {
                        id: contactId
                    });
                }

                if (config.debug) {
                    $notification.info("Company Details loaded", "ABAdmin Companies", config.notificationDelay);
                }
            }
        ]);
})();