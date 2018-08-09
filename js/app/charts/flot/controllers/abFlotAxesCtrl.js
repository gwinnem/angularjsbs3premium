/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Playing with the chart axes.
 */
(function () {
    "use strict";
    angular.module("abFlot", [[]])
        .controller("FlotAxesController", ["$scope", "$notification", "abFlotFactory", "config",
            function ($scope, $notification, abFlotFactory, config) {

                // footer details
                $scope.footerText = abFlotFactory.footerText;
                if (config.debug) {
                    $notification.success("Charts loaded", "Flot", config.notificationDelay);
                }
            }]);
})();

