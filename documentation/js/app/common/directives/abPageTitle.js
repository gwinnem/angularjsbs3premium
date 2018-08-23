/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Directive for displaying a page title.
 */

(function () {
    "use strict";

    angular.module("abPageTitle", ["ui.router"])
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
            };
        });
})();