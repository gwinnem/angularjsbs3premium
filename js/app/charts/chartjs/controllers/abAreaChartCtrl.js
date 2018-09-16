/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js area charts.
 */
(function () {
    "use strict";
    angular.module("abChartJs", [])
        .controller("ChartJsAreaChartsController", ["$notification", "config", function ($notification, config) {
            var chartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: window.chartColors.blue,
                    borderWidth: 2,
                    fill: false,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ]
                }, {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: window.chartColors.red,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }, {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: window.chartColors.green,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ]
                }]

            };

            var ctx = document.getElementById('canvas').getContext('2d');
            window.myMixedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Combo Bar Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });
            document.getElementById('randomizeData').addEventListener('click', function () {
                chartData.datasets.forEach(function (dataset) {
                    dataset.data = dataset.data.map(function () {
                        return randomScalingFactor();
                    });
                });
                window.myMixedChart.update();
            });

            if (config.debug) {
                $notification.success("Area charts loaded", "Chart.js", config.notificationDelay);
            }
        }]);
})();
