/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Chart.js other charts.
 */
(function () {
    "use strict";
    angular.module("AbOtherChartsModule", [[]])
        .controller("ChartJsOtherChartsController", ["$scope", "$notification", "abBarChartsCommon", "config",
            function ($scope, $notification, abBarChartsCommon, config) {

                $scope.service = abBarChartsCommon;
                $scope.baseData1 = [
                    {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }
                ];

                $scope.baseData2 = [
                    {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }, {
                        x: $scope.service.getDataSet(1),
                        y: $scope.service.getDataSet(1)
                    }
                ];
                var getContext = function (context) {
                    return document.getElementById(context).getContext("2d");
                }
                $scope.scatterChartData = {
                    datasets: [{
                        label: "My First dataset",
                        borderColor: $scope.service.chartColors.red,
                        backgroundColor: $scope.service.transparentize(abBarChartsCommon.chartColors.red, 0.2),
                        data: $scope.baseData1
                    }, {
                        label: "My Second dataset",
                        borderColor: $scope.service.chartColors.blue,
                        backgroundColor: $scope.service.transparentize(abBarChartsCommon.chartColors.blue, 0.2),
                        data: $scope.baseData2
                    }]
                };

                $scope.basicScatter = Chart.Scatter(getContext("canvas-scatter"), {
                    data: $scope.scatterChartData,
                    options: {
                        title: {
                            display: true,
                            text: 'Chart.js Scatter Chart'
                        }
                    }
                });

                $scope.scatterMulti = Chart.Scatter(getContext("canvas-multi-axis"), {
                    data: $scope.scatterChartData,
                    options: {
                        responsive: true,
                        hoverMode: 'nearest',
                        intersect: true,
                        title: {
                            display: true,
                            text: 'Chart.js Scatter Chart - Multi Axis'
                        },
                        scales: {
                            xAxes: [{
                                position: "bottom",
                                gridLines: {
                                    zeroLineColor: "rgba(0,0,0,1)"
                                }
                            }],
                            yAxes: [{
                                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: "left",
                                id: "y-axis-1"
                            }, {
                                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: "right",
                                reverse: true,
                                id: "y-axis-2",

                                // grid line settings
                                gridLines: {
                                    drawOnChartArea: false // only want the grid lines for one axis to show up
                                }
                            }]
                        }
                    }
                });

                var doughnutConfig = {
                    type: "doughnut",
                    data: {
                        datasets: [{
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ],
                            backgroundColor: [
                                $scope.service.chartColors.red,
                                $scope.service.chartColors.orange,
                                $scope.service.chartColors.yellow,
                                $scope.service.chartColors.green,
                                $scope.service.chartColors.blue
                            ],
                            label: "Dataset 1"
                        }],
                        labels: [
                            "Red",
                            "Orange",
                            "Yellow",
                            "Green",
                            "Blue"
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: "top"
                        },
                        title: {
                            display: true,
                            text: "Chart.js Doughnut Chart"
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        }
                    }
                };
                $scope.myDoughnut = new Chart(getContext("canvas-doughnut"), doughnutConfig);

                var pieConfig = {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ],
                            backgroundColor: [
                                $scope.service.chartColors.red,
                                $scope.service.chartColors.orange,
                                $scope.service.chartColors.yellow,
                                $scope.service.chartColors.green,
                                $scope.service.chartColors.blue
                            ],
                            label: 'Dataset 1'
                        }],
                        labels: [
                            "Red",
                            "Orange",
                            "Yellow",
                            "Green",
                            "Blue"
                        ]
                    },
                    options: {
                        responsive: true
                    }
                };
                $scope.myPie = new Chart(getContext("canvas-pie"), pieConfig);

                var radarConfig = {
                    type: 'radar',
                    data: {
                        labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: $scope.service.transparentize($scope.service.chartColors.red, 0.2),
                            borderColor: $scope.service.chartColors.red,
                            pointBackgroundColor: $scope.service.chartColors.red,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: $scope.service.transparentize($scope.service.chartColors.blue, 0.2),
                            borderColor: $scope.service.chartColors.blue,
                            pointBackgroundColor: $scope.service.chartColors.blue,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }]
                    },
                    options: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Radar Chart'
                        },
                        scale: {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                };
                $scope.myRadar = new Chart(getContext("canvas-radar"), radarConfig);

                var polarConfig = {
                    data: {
                        datasets: [{
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ],
                            backgroundColor: [
                                $scope.service.transparentize($scope.service.chartColors.red, 0.2),
                                $scope.service.transparentize($scope.service.chartColors.orange, 0.2),
                                $scope.service.transparentize($scope.service.chartColors.yellow, 0.2),
                                $scope.service.transparentize($scope.service.chartColors.green, 0.2),
                                $scope.service.transparentize($scope.service.chartColors.blue, 0.2)
                            ],
                            label: 'My dataset' // for legend
                        }],
                        labels: [
                            "Red",
                            "Orange",
                            "Yellow",
                            "Green",
                            "Blue"
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'right'
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Polar Area Chart'
                        },
                        scale: {
                            ticks: {
                                beginAtZero: true
                            },
                            reverse: false
                        },
                        animation: {
                            animateRotate: false,
                            animateScale: true
                        }
                    }
                };
                $scope.myPolarArea = Chart.PolarArea(getContext("canvas-polar"), polarConfig);

                var comboData = {
                    labels: $scope.service.monthsTo(7),
                    datasets: [{
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: $scope.service.chartColors.blue,
                        borderWidth: 2,
                        fill: false,
                        data: [
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor()
                        ]
                    }, {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: $scope.service.chartColors.red,
                        data: [
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor()
                        ],
                        borderColor: 'white',
                        borderWidth: 2
                    }, {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: $scope.service.chartColors.green,
                        data: [
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor(),
                            $scope.service.randomScalingFactor()
                        ]
                    }]

                };
                $scope.myMixedChart = new Chart(getContext("canvas-combo"), {
                    type: 'bar',
                    data: comboData,
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

                var bubbleChartData = {
                    animation: {
                        duration: 10000
                    },
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: $scope.service.transparentize($scope.service.chartColors.red, 0.2),
                        borderColor: $scope.service.chartColors.red,
                        borderWidth: 1,
                        data: [{
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: $scope.service.transparentize($scope.service.chartColors.orange, 0.2),
                        borderColor: $scope.service.chartColors.orange,
                        borderWidth: 1,
                        data: [{
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }, {
                            x: $scope.service.randomScalingFactor(),
                            y: $scope.service.randomScalingFactor(),
                            r: Math.abs($scope.service.randomScalingFactor()) / 5
                        }]
                    }]
                };
                $scope.myBubble = new Chart(getContext("canvas-bubble"), {
                    type: 'bubble',
                    data: bubbleChartData,
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart.js Bubble Chart'
                        },
                        tooltips: {
                            mode: 'point'
                        }
                    }
                });

                var myRadarSkipConfig = {
                    type: 'radar',
                    data: {
                        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                        datasets: [{
                            label: "Skip first dataset",
                            borderColor: $scope.service.chartColors.red,
                            backgroundColor: $scope.service.transparentize($scope.service.chartColors.red, 0.2),
                            pointBackgroundColor: $scope.service.chartColors.red,
                            data: [
                                NaN,
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }, {
                            label: "Skip mid dataset",
                            borderColor: $scope.service.chartColors.blue,
                            backgroundColor: $scope.service.transparentize($scope.service.chartColors.blue, 0.2),
                            pointBackgroundColor: $scope.service.chartColors.blue,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                NaN,
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }, {
                            label: "Skip last dataset",
                            borderColor: $scope.service.chartColors.green,
                            backgroundColor: $scope.service.transparentize($scope.service.chartColors.yellow, 0.2),
                            pointBackgroundColor: $scope.service.chartColors.yellow,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                NaN
                            ]
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Chart.js Radar Chart - Skip Points"
                        },
                        elements: {
                            line: {
                                tension: 0.0
                            }
                        },
                        scale: {
                            beginAtZero: true
                        }
                    }
                };
                $scope.myRadarSkip = new Chart(getContext("canvas-radar-skip"), myRadarSkipConfig);

                var progress = document.getElementById('animationProgress');
                var progressConfig = {
                    type: 'line',
                    data: {
                        labels: $scope.service.monthsTo(7),
                        datasets: [{
                            fill: false,
                            borderColor: $scope.service.chartColors.red,
                            backgroundColor: $scope.service.chartColors.red,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }, {
                            label: "My Second dataset ",
                            fill: false,
                            borderColor: $scope.service.chartColors.blue,
                            backgroundColor: $scope.service.chartColors.blue,
                            data: [
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor(),
                                $scope.service.randomScalingFactor()
                            ]
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Chart.js Line Chart - Animation Progress Bar"
                        },
                        animation: {
                            duration: 2000,
                            onProgress: function (animation) {
                                progress.value = animation.currentStep / animation.numSteps;
                            },
                            onComplete: function (animation) {
                                window.setTimeout(function () {
                                    progress.value = 0;
                                }, 2000);
                            }
                        }
                    }
                };
                $scope.myProgress = new Chart(getContext("canvas-progress"), progressConfig);

                $scope.randomizeScatterData = function (chart) {
                    $scope.scatterChartData.datasets.forEach(function (dataset) {
                        dataset.data = dataset.data.map(function () {
                            return {
                                x: $scope.service.getDataSet(1),
                                y: $scope.service.getDataSet(1)
                            };
                        });
                    });
                    if (chart === "basic") {
                        $scope.basicScatter.update();
                    } else if (chart === "multi") {
                        $scope.scatterMulti.update();
                    } else if (chart === "doughnut") {
                        doughnutConfig.data.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myDoughnut.update();
                    } else if (chart === "pie") {
                        pieConfig.data.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myPie.update();
                    } else if (chart === "radar") {
                        radarConfig.data.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myRadar.update();
                    } else if (chart === "polar") {
                        polarConfig.data.datasets.forEach(function (piece, i) {
                            piece.data.forEach(function (value, j) {
                                polarConfig.data.datasets[i].data[j] = $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myPolarArea.update();
                    } else if (chart === "combo") {
                        comboData.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myMixedChart.update();
                    } else if (chart === "bubble") {
                        bubbleChartData.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return {
                                    x: $scope.service.randomScalingFactor(),
                                    y: $scope.service.randomScalingFactor(),
                                    r: Math.abs($scope.service.randomScalingFactor()) / 5
                                };
                            });
                        });
                        $scope.myBubble.update();
                    } else if (chart === "radar-skip") {
                        myRadarSkipConfig.data.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });
                        $scope.myRadarSkip.update();
                    } else if (chart === "progress") {
                        progressConfig.data.datasets.forEach(function (dataset) {
                            dataset.data = dataset.data.map(function () {
                                return $scope.service.randomScalingFactor();
                            });
                        });

                        $scope.myProgress.update();
                    }
                }

                if (config.debug) {
                    $notification.success("Other charts loaded", "Chart.js", config.notificationDelay);
                }
            }]);
})();
