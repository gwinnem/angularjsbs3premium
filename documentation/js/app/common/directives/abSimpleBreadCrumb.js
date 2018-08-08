/**
 * Simple breadcrumb directive
 * @author Geirr Winnem
 * @version 1.0.0
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
            };
        });
})();