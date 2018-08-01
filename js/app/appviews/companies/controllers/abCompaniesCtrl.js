/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Company list controller.
 */
(function () {
    "use strict";
    angular.module("ab.companies.list", [])
        .controller("CompaniesController", ["$scope", "$notification", "config", "abCompaniesSvc", "$state", "modalDialogs",
            function ($scope, $notification, config, abCompaniesSvc, $state, modalDialogs) {
                var service = abCompaniesSvc;
                $scope.action = service.actions;
                $scope.companies = [];

                $scope.getCompanyList = function () {
                    service.getAll()
                        .then(function (data) {
                            if (config.debug) {
                                console.log("get companies");
                                console.log(data);
                            }
                            $scope.totalRecords = data.length;
                            $scope.companies = data;
                            $scope.isLoading = false;
                        }).catch(function (message) {
                            $scope.isLoading = false;
                            $notification.warning(message);
                            if (config.debug) {
                                console.log(message);
                            }
                        });
                };

                $scope.displayCompany = function (id) {
                    $state.go("companydetails", {
                        id: id,
                        action: service.actions.display
                    });
                };

                $scope.editCompany = function (id) {
                    $state.go("companydetails", {
                        id: id,
                        action: service.actions.edit
                    });
                };

                $scope.deleteCompany = function (id) {
                    modalDialogs.openConfirmDialog("Do you really want to delete this company?", "Delete Confirmation")
                        .then(function (result) {
                            if (result) {
                                service.deleteCompany(id).then(function (data) {
                                    $scope.companies = data;
                                    if (config.debug) {
                                        $notification.success("Company deleted", "Company list");
                                    }
                                }).catch(function (message) {
                                    if (config.debug) {
                                        console.log(message);
                                    }
                                    $notification.error(message, "Company delete failed", config.notificationDelay);
                                });
                            }
                        });
                }

                $scope.getCompanyList();
            }
        ]);
})();