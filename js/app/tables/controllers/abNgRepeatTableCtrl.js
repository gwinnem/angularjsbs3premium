/**
 * abNgRepeatTableCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying table data using ng-repeat
 */
(function () {
    "use strict";
    angular.module("NgRepeatTableModule", [
            []
        ])
        .controller("NgRepeatTableController", ["$scope", "$notification", "abNgRepeatTableSvc", "config",
            function ($scope, $notification, abNgRepeatTableSvc, config) {
                var service = abNgRepeatTableSvc;
                $scope.baseData = service.baseData;
                $scope.page = 1;


                $scope.getPage = function (page) {
                    $scope.page = page;
                    service.getPage(page)
                        .then(function (data) {
                            $scope.pageData = data.data.results;
                        }),
                        function (message) {
                            $notification.error(message, "ngRepeat", 3000);
                        };
                }

                service.get()
                    .then(function (data) {
                        $scope.apiData = data.data.results;
                    }),
                    function (message) {
                        $notification.error(message, "ngRepeat", 3000);
                    };

                $scope.scrollData = service.baseData;
                $scope.getMoreData = function () {
                    service.get()
                        .then(function (data) {
                            for (var i = 0; i < data.data.results.length; i++) {
                                $scope.scrollData.push(data.data.results[i]);
                            }
                            $notification.success("Loading more data", "WhenScrollEnds", 3000);
                        }),
                        function (message) {
                            $notification.error(message, "ngRepeat", 3000);
                        };

                }

                $scope.getPage(1);

                if (config.debug) {
                    $notification.info("Tables loaded", "ngRepeat", config.notificationDelay);
                }
            }
        ]);
})();