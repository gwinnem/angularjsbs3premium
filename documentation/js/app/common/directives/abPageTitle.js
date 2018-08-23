/**
 * abPageTitle.js
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
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