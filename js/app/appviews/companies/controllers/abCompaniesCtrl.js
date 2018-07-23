/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Company list controller.
 */
(function () {
    "use strict";
    angular.module("ab.companies.list", [
            []
        ])
        .controller("CompaniesController", ["$scope", "$notification", "config", "abCompaniesSvc", "$state",
            function ($scope, $notification, config, abCompaniesSvc, $state) {
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

                $scope.getCompanyList();
            }
        ]);
})();