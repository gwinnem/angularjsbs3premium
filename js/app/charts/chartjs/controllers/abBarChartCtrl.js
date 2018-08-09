/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js bar charts.
 */
(function () {
    "use strict";
    angular.module("abChartJs", [[]])
        .controller("ChartJsBarChartsController", ["$scope", "$notification", "abBarChartFactory", "config",
            function ($scope, $notification, abBarChartFactory, config) {
                $scope.service = abBarChartFactory;
                $scope.notify = $notification;
                var getContext = function (id) {
                    return document.getElementById(id).getContext("2d");
                }


                // Vertical chart
                new Chart(getContext("canvas-vertical"), {
                    type: "bar",
                    data: $scope.service.baseData,
                    options: {
                        elements: {
                            rectangle: {
                                borderWidth: 2
                            }
                        },
                        responsive: true,
                        legend: {
                            position: "top"
                        },
                        title: {
                            display: true,
                            text: "Chart.js Vertical Bar Chart"
                        }
                    }
                });


                // Horizontal chart
                new Chart(getContext("canvas-horizontal"), {
                    type: "horizontalBar",
                    data: $scope.service.baseData,
                    options: {
                        elements: {
                            rectangle: {
                                borderWidth: 2
                            }
                        },
                        responsive: true,
                        legend: {
                            position: "right"
                        },
                        title: {
                            display: true,
                            text: "Chart.js Horizontal Bar Chart"
                        }
                    }
                });

                // Stacked chart
                var stackedBarChartData = {
                    labels: $scope.service.monthsToJuly,
                    datasets: [{
                        label: "Dataset 1",
                        backgroundColor: $scope.service.chartColors.red,
                        data: $scope.service.getDataSet(7)
                    }, {
                        label: "Dataset 2",
                        backgroundColor: $scope.service.chartColors.blue,
                        data: $scope.service.getDataSet(7)
                    }, {
                        label: "Dataset 3",
                        backgroundColor: $scope.service.chartColors.green,
                        data: $scope.service.getDataSet(7)
                    }]

                };

                new Chart(getContext("canvas-stacked"), {
                    type: "bar",
                    data: stackedBarChartData,
                    options: {
                        title: {
                            display: true,
                            text: "Chart.js Bar Chart - Stacked"
                        },
                        tooltips: {
                            mode: "index",
                            intersect: false
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });

                // Stacked Group chart
                var stackedGroupBarChartData = {
                    labels: $scope.service.monthsToJuly,
                    datasets: [{
                        label: "Dataset 1",
                        backgroundColor: $scope.service.chartColors.red,
                        stack: "Stack 0",
                        data: $scope.service.getDataSet(7)
                    }, {
                        label: "Dataset 2",
                        backgroundColor: $scope.service.chartColors.blue,
                        stack: "Stack 0",
                        data: $scope.service.getDataSet(7)
                    }, {
                        label: "Dataset 3",
                        backgroundColor: $scope.service.chartColors.green,
                        stack: "Stack 1",
                        data: $scope.service.getDataSet(7)
                    }]

                };

                new Chart(getContext("canvas-stacked-group"), {
                    type: "bar",
                    data: stackedGroupBarChartData,
                    options: {
                        title: {
                            display: true,
                            text: "Chart.js Bar Chart - Stacked Group"
                        },
                        tooltips: {
                            mode: "index",
                            intersect: false
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });

                // Multi axis
                var barChartData = {
                    labels: $scope.service.monthsToJuly,
                    datasets: [{
                        label: "Dataset 1",
                        backgroundColor: [
                            $scope.service.chartColors.red,
                            $scope.service.chartColors.orange,
                            $scope.service.chartColors.yellow,
                            $scope.service.chartColors.green,
                            $scope.service.chartColors.blue,
                            $scope.service.chartColors.purple,
                            $scope.service.chartColors.red
                        ],
                        yAxisID: "y-axis-1",
                        data: $scope.service.getDataSet(7)
                    }, {
                        label: "Dataset 2",
                        backgroundColor: $scope.service.chartColors.grey,
                        yAxisID: "y-axis-2",
                        data: $scope.service.getDataSet(7)
                    }]

                };
                new Chart(getContext("canvas-multi-axis"), {
                    type: "bar",
                    data: barChartData,
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Chart.js Bar Chart - Multi Axis"
                        },
                        tooltips: {
                            mode: "index",
                            intersect: true
                        },
                        scales: {
                            yAxes: [{
                                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: "left",
                                id: "y-axis-1"
                            }, {
                                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: "right",
                                id: "y-axis-2",
                                gridLines: {
                                    drawOnChartArea: true
                                }
                            }]
                        }
                    }
                });
                if (config.debug) {
                    $notification.success("Bar charts loaded", "Chart.js", config.notificationDelay);
                }

            }]);
})();
