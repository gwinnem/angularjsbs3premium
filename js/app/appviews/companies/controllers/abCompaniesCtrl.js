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
                $scope.sortReverse = false;
                $scope.sortType = "name";

                $scope.getCompanyList = function () {
                    service.getAll()
                        .then(function (data) {
                            if (config.debug) {
                                console.log("get companies");
                                console.log(data);
                            }
                            $scope.totalRecords = data.length;
                            $scope.companies = data;
                        }).catch(function (message) {
                            $notification.warning(message);
                            if (config.debug) {
                                console.log(message);
                            }
                        });
                };

                $scope.displayCompany = function (id,action, returnview) {
                    var view = returnview;
                    if (view === 2) {
                        view = "companylistv2";
                    } else {
                        view = "companylist";
                    }
                    $state.go("companydetails", {
                        id: id,
                        action: action,
                        view: view
                    });
                };

                $scope.editCompany = function (id, action, returnview) {
                    var view = returnview;
                    if (view === 2) {
                        view = "companylistv2";
                    } else {
                        view = "companylist";
                    }
                    $state.go("companydetails",{
                        id: id,
                        action: action,
                        view: view
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