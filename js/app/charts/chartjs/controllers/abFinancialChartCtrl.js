/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js Financial charts.
 */
(function () {
    "use strict";
    angular.module("abChartJs", [[]])
        .controller("ChartJsFinancialChartsController", ["$notification", "config",
            function ($notification, config) {
                function randomNumber(min, max) {
                    return Math.random() * (max - min) + min;
                }

                function randomBar(date, lastClose) {
                    var open = randomNumber(lastClose * .95, lastClose * 1.05);
                    var close = randomNumber(open * .95, open * 1.05);
                    var high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
                    var low = randomNumber(Math.min(open, close) * .9, Math.min(open, close));
                    return {
                        t: date.valueOf(),
                        o: open,
                        h: high,
                        l: low,
                        c: close
                    };
                }

                var dateFormat = 'MMMM DD YYYY';
                var date = moment('April 01 2017', dateFormat);
                var data = [randomBar(date, 30)];
                while (data.length < 60) {
                    date = date.clone().add(1, 'd');
                    if (date.isoWeekday() <= 5) {
                        data.push(randomBar(date, data[data.length - 1].c));
                    }
                }

                var ctx = document.getElementById("canvas-financial").getContext("2d");
                var financial = new Chart(ctx, {
                    type: 'financial',
                    data: {
                        datasets: [{
                            label: "CHRT - Chart.js Corporation",
                            data: data
                        }]
                    }
                });

                if (config.debug) {
                    $notification.success("Financial charts loaded", "Chart.js", config.notificationDelay);
                }
            }]);
})();
