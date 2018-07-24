/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Generating page title text using data from the ui router
 */
(function () {
    "use strict";

    angular.module("ab.common.ui.pageTitle", ["ui.router"])
        .directive("abPageTitle", function ($rootScope, $timeout) {
            return {
                restrict: "EA",
                link: function ($scope) {
                    $scope.pageTitle = "";
                    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                        $timeout(function () {
                            $scope.pageTitle = toState.pageTitle;
                        });
                    });
                }
            }
        });
})();