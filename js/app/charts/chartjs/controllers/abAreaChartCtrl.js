/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js area charts.
 */
(function () {
    "use strict";
    angular.module("abChartJs", [[]])
        .controller("ChartJsAreaChartsController", ["$notification", "config", function ($notification, config) {
            if (config.debug) {
                $notification.success("Area charts loaded", "Chart.js", config.notificationDelay);
            }
        }]);
})();
