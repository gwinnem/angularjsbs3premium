/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js line charts.
 */
(function () {
    "use strict";
    angular.module("abChartJs", [[]])
        .controller("ChartJsLineChartsController", ["$scope", "$notification", "abBarChartFactory", "config",
            function ($scope, $notification, abBarChartFactory, config) {
                $scope.service = abBarChartFactory;
                $scope.notify = $notification;
                function getContext(canvas) {
                    return document.getElementById(canvas).getContext("2d");
                }

                // Basic chart
                var baseData = $scope.service.baseData;
                baseData.datasets[0].fill = false;
                baseData.datasets[1].fill = false;
                var chartconfig = {
                    type: 'line',
                    data: baseData,
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart.js Basic Line Chart'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }]
                        }
                    }
                };
                new Chart(getContext("canvas-basic"), chartconfig);

                // Multi axis chart
                var multiAxisData = {
                    labels: $scope.service.monthsToJuly,
                    datasets: [{
                        label: "My First dataset",
                        borderColor: $scope.service.chartColors.red,
                        backgroundColor: $scope.service.chartColors.red,
                        fill: false,
                        data: $scope.service.getDataSet(7),
                        yAxisID: "y-axis-1"
                    }, {
                        label: "My Second dataset",
                        borderColor: $scope.service.chartColors.blue,
                        backgroundColor: $scope.service.chartColors.blue,
                        fill: false,
                        data: $scope.service.getDataSet(7),
                        yAxisID: "y-axis-2"
                    }]
                };
                Chart.Line(getContext("canvas-multi-axis"), {
                    data: multiAxisData,
                    options: {
                        responsive: true,
                        hoverMode: 'index',
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Multi Axis'
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

                                // grid line settings
                                gridLines: {
                                    drawOnChartArea: false // only want the grid lines for one axis to show up
                                }
                            }]
                        }
                    }
                });

                // Stepped line charts
                var data = $scope.service.getDataSet(7);
                var steppedLineSettings = [{
                    steppedLine: false,
                    label: 'No Step Interpolation',
                    color: $scope.service.chartColors.red
                }, {
                    steppedLine: 'before',
                    label: 'Step Before Interpolation',
                    color: $scope.service.chartColors.green
                }, {
                    steppedLine: 'after',
                    label: 'Step After Interpolation',
                    color: $scope.service.chartColors.purple
                }];

                function createConfig(details, data) {
                    return {
                        type: 'line',
                        data: {
                            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
                            datasets: [{
                                label: 'steppedLine: ' + ((typeof (details.steppedLine) === 'boolean') ? details.steppedLine : `'${details.steppedLine}'`),
                                steppedLine: details.steppedLine,
                                data: data,
                                borderColor: details.color,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: details.label
                            }
                        }
                    };
                }

                // No step
                chartconfig = createConfig(steppedLineSettings[0], data);
                new Chart(getContext("canvas-no-step"), chartconfig);

                // Step before
                chartconfig = createConfig(steppedLineSettings[1], data);
                new Chart(getContext("canvas-step-before"), chartconfig);

                // Step after
                config = createConfig(steppedLineSettings[2], data);
                new Chart(getContext("canvas-step-after"), chartconfig);

                // Interpolation modes
                var datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
                chartconfig = {
                    type: 'line',
                    data: {
                        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                        datasets: [{
                            label: "Cubic interpolation (monotone)",
                            data: datapoints,
                            borderColor: $scope.service.chartColors.red,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            fill: false,
                            cubicInterpolationMode: 'monotone'
                        }, {
                            label: "Cubic interpolation (default)",
                            data: datapoints,
                            borderColor: $scope.service.chartColors.blue,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            fill: false
                        }, {
                            label: "Linear interpolation",
                            data: datapoints,
                            borderColor: $scope.service.chartColors.green,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            fill: false,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Cubic interpolation mode'
                        },
                        tooltips: {
                            mode: 'index'
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                },
                                ticks: {
                                    suggestedMin: -10,
                                    suggestedMax: 200
                                }
                            }]
                        }
                    }
                };
                new Chart(getContext("canvas-interpolation"), chartconfig);

                // Line styles
                chartconfig = {
                    type: 'line',
                    data: {
                        labels: $scope.service.monthsToJuly,
                        datasets: [{
                            label: "Unfilled",
                            fill: false,
                            backgroundColor: $scope.service.chartColors.blue,
                            borderColor: $scope.service.chartColors.blue,
                            data: $scope.service.getDataSet(7)
                        }, {
                            label: "Dashed",
                            fill: false,
                            backgroundColor: $scope.service.chartColors.green,
                            borderColor: $scope.service.chartColors.green,
                            borderDash: [5, 5],
                            data: $scope.service.getDataSet(7)
                        }, {
                            label: "Filled",
                            backgroundColor: $scope.service.chartColors.red,
                            borderColor: $scope.service.chartColors.red,
                            data: $scope.service.getDataSet(7),
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart.js Line Styles Chart'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }]
                        }
                    }
                };
                new Chart(getContext("canvas-line-styles"), chartconfig);

                // Point sizes
                chartconfig = {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "dataset - big points",
                            data: $scope.service.getDataSet(7),
                            backgroundColor: $scope.service.chartColors.red,
                            borderColor: $scope.service.chartColors.red,
                            fill: false,
                            borderDash: [5, 5],
                            pointRadius: 15,
                            pointHoverRadius: 10
                        }, {
                            label: "dataset - individual point sizes",
                            data: $scope.service.getDataSet(7),
                            backgroundColor: $scope.service.chartColors.blue,
                            borderColor: $scope.service.chartColors.blue,
                            fill: false,
                            borderDash: [5, 5],
                            pointRadius: [2, 4, 6, 18, 0, 12, 20]
                        }, {
                            label: "dataset - large pointHoverRadius",
                            data: $scope.service.getDataSet(7),
                            backgroundColor: $scope.service.chartColors.green,
                            borderColor: $scope.service.chartColors.green,
                            fill: false,
                            pointHoverRadius: 30
                        }, {
                            label: "dataset - large pointHitRadius",
                            data: $scope.service.getDataSet(7),
                            backgroundColor: $scope.service.chartColors.yellow,
                            borderColor: $scope.service.chartColors.yellow,
                            fill: false,
                            pointHitRadius: 20
                        }]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'bottom'
                        },
                        hover: {
                            mode: 'index'
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Different point sizes'
                        }
                    }
                };
                new Chart(getContext("canvas-point-sizes"), chartconfig);

                // Point styles
                function createPointStyleConfig(pointStyle) {
                    return {
                        type: 'line',
                        data: {
                            labels: $scope.service.monthsToJuly,
                            datasets: [{
                                label: "My First dataset",
                                backgroundColor: $scope.service.chartColors.red,
                                borderColor: $scope.service.chartColors.red,
                                data: [10, 23, 5, 99, 67, 43, 0],
                                fill: false,
                                pointRadius: 10,
                                pointHoverRadius: 15,
                                showLine: false // no line shown
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Point Style: ' + pointStyle
                            },
                            legend: {
                                display: false
                            },
                            elements: {
                                point: {
                                    pointStyle: pointStyle
                                }
                            }
                        }
                    };
                }

                chartconfig = createPointStyleConfig("circle");
                new Chart(getContext("canvas-point-circle"), chartconfig);

                chartconfig = createPointStyleConfig("triangle");
                new Chart(getContext("canvas-point-triangle"), chartconfig);

                chartconfig = createPointStyleConfig("rect");
                new Chart(getContext("canvas-point-rect"), chartconfig);

                chartconfig = createPointStyleConfig("rectRounded");
                new Chart(getContext("canvas-point-rectRounded"), chartconfig);

                chartconfig = createPointStyleConfig("rectRot");
                new Chart(getContext("canvas-point-rectRot"), chartconfig);

                chartconfig = createPointStyleConfig("cross");
                new Chart(getContext("canvas-point-cross"), chartconfig);

                chartconfig = createPointStyleConfig("crossRot");
                new Chart(getContext("canvas-point-crossRot"), chartconfig);

                chartconfig = createPointStyleConfig("star");
                new Chart(getContext("canvas-point-star"), chartconfig);

                chartconfig = createPointStyleConfig("line");
                new Chart(getContext("canvas-point-line"), chartconfig);

                chartconfig = createPointStyleConfig("dash");
                new Chart(getContext("canvas-point-dash"), chartconfig);

                // Skipped points
                var dataSet1 = $scope.service.getDataSet(7);
                dataSet1[2] = NaN;
                var dataSet2 = $scope.service.getDataSet(7);
                dataSet2[0] = NaN;
                dataSet2[6] = NaN;
                chartconfig = {
                    type: 'line',
                    data: {
                        labels: $scope.service.monthsToJuly,
                        datasets: [{
                            label: "My First dataset",
                            borderColor: $scope.service.chartColors.red,
                            fill: false,
                            // Skip a point in the middle
                            data: dataSet1

                        }, {
                            label: "My Second dataset",
                            borderColor: $scope.service.chartColors.blue,
                            fill: false,
                            // Skip first and last points
                            data: dataSet2
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Skip Points'
                        },
                        tooltips: {
                            mode: 'index'
                        },
                        hover: {
                            mode: 'index'
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }]
                        }
                    }
                };
                new Chart(getContext("canvas-skip-point"), chartconfig);


                if (config.debug) {
                    $scope.notify.success("Line charts loaded", "Chart.js", config.notificationDelay);
                }

            }]);
})();