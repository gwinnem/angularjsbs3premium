/**
 * abFlotBasicCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying Flot basic charts.
 */
(function () {
    "use strict";
    angular.module("abFlot", [[]])
        .controller("FlotBasicChartsController", ["$scope", "$notification", "abFlotFactory", "config",
            function ($scope, $notification, abFlotFactory, config) {
                // Basic options chart.
                $.plot("#basicoptions", [
                    { label: "sin(x)", data: abFlotFactory.getSinusCurve() },
                    { label: "cos(x)", data: abFlotFactory.getCosinusCurve() },
                    { label: "tan(x)", data: abFlotFactory.getTangensCurve() }
                ], {
                        series: {
                            lines: { show: true },
                            points: { show: true }
                        },
                        xaxis: {
                            ticks: [
                                0, [Math.PI / 2, "\u03c0/2"], [Math.PI, "\u03c0"],
                                [Math.PI * 3 / 2, "3\u03c0/2"], [Math.PI * 2, "2\u03c0"]
                            ]
                        },
                        yaxis: {
                            ticks: 10,
                            min: -2,
                            max: 2,
                            tickDecimals: 3
                        },
                        grid: {
                            backgroundColor: { colors: ["#fff", "#eee"] },
                            borderWidth: {
                                top: 1,
                                right: 1,
                                bottom: 2,
                                left: 2
                            }
                        }
                    });


                // Basic chart



                // footer details
                $scope.footerText = abFlotFactory.footerText;
                if (config.debug) {
                    $notification.success("Basic charts loaded", "Flot", config.notificationDelay);
                }
            }]);
})();
