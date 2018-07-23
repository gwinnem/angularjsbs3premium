/**
 * abMorrisDonutChartCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying Morris donut charts.
 */
(function () {
    "use strict";
    angular.module("AbMorrisDonutChartsModule", [[]])
        .controller("MorrisDonutChartsController", ["$notification", "config",
            function ($notification, config) {
                //DONUT CHART 1
                Morris.Donut({
                    element: 'sales-chart',
                    resize: true,
                    colors: ["#3c8dbc", "#f56954", "#00a65a"],
                    data: [
                      { label: "Download Sales", value: 12 },
                      { label: "In-Store Sales", value: 30 },
                      { label: "Mail-Order Sales", value: 20 }
                    ],
                    hideHover: 'auto'
                });

                // DONUT CHART 2
                Morris.Donut({
                    element: 'donut',
                    resize: true,
                    hideHover: 'auto',
                    data: [
                      { value: 70, label: 'foo' },
                      { value: 15, label: 'bar' },
                      { value: 10, label: 'baz' },
                      { value: 5, label: 'A really really long label' }
                    ],
                    formatter: function (x) { return x + "%" }
                }).on('click', function (i, row) {
                    console.log(i, row);
                });
                if (config.debug) {
                    $notification.success("Donut charts loaded", "Morris Charts", config.notificationDelay);
                }
            }]);
})();
