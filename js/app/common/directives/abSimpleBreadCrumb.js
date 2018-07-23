/**
 * Simple breadcrumb directive
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary 
 */
(function () {
    "use strict";

    angular.module("abSimpleBreadCrumbs", ["ui.router"])
        .directive("simleBreadCrumbs", function ($rootScope, $timeout) {
            return {
                restrict: "A",
                link: function ($scope) {
                    $scope.pageBreadCrumbs = "";
                    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                        $timeout(function () {
                            $scope.pageBreadCrumbs = toState.pageBreadCrumbs;
                        });
                    });
                }
            }
        });
})();