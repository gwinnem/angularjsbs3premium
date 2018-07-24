/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Creating simple bread crumbs using state data from the ui router
 */
(function () {
    "use strict";
    angular.module("ab.common.ui.simplebreadcrumbs", ["ui.router"])
        .directive("abSimpleBreadcrumbs", function ($rootScope, $timeout) {
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