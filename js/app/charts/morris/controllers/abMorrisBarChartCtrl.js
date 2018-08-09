/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Morris bar charts.
 */
(function () {
    "use strict";
    angular.module("AbMorrisBarChartsModule", [[]])
        .controller("MorrisBarChartsController", ["$notification", "config",
            function ($notification, config) {
                //BASIC BAR CHART
                Morris.Bar({
                    element: 'bar-chart-1',
                    resize: true,
                    data: [
                      { y: '2006', a: 100, b: 90 },
                      { y: '2007', a: 75, b: 65 },
                      { y: '2008', a: 50, b: 40 },
                      { y: '2009', a: 75, b: 65 },
                      { y: '2010', a: 50, b: 40 },
                      { y: '2011', a: 75, b: 65 },
                      { y: '2012', a: 100, b: 90 }
                    ],
                    barColors: ['#00a65a', '#f56954'],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['CPU', 'DISK'],
                    hideHover: 'auto'
                });
                // DYNAMIC COLORS
                Morris.Bar({
                    element: 'bar-chart-2',
                    data: [
                      { x: '2011 Q1', y: 0 },
                      { x: '2011 Q2', y: 1 },
                      { x: '2011 Q3', y: 2 },
                      { x: '2011 Q4', y: 3 },
                      { x: '2012 Q1', y: 4 },
                      { x: '2012 Q2', y: 5 },
                      { x: '2012 Q3', y: 6 },
                      { x: '2012 Q4', y: 7 },
                      { x: '2013 Q1', y: 8 }
                    ],
                    xkey: 'x',
                    ykeys: ['y'],
                    labels: ['Y'],
                    hideHover: 'auto',
                    barColors: function (row, series, type) {
                        if (type === 'bar') {
                            var red = Math.ceil(255 * row.y / this.ymax);
                            return 'rgb(' + red + ',0,0)';
                        }
                        else {
                            return '#000';
                        }
                    }
                });
                // NO AXES
                Morris.Bar({
                    element: 'bar-no-axes',
                    axes: false,
                    data: [
                      { x: '2011 Q1', y: 3, z: 2, a: 3 },
                      { x: '2011 Q2', y: 2, z: null, a: 1 },
                      { x: '2011 Q3', y: 0, z: 2, a: 4 },
                      { x: '2011 Q4', y: 2, z: 4, a: 3 }
                    ],
                    xkey: 'x',
                    ykeys: ['y', 'z', 'a'],
                    labels: ['Y', 'Z', 'A'],
                    hideHover: 'auto'
                });
                // DIAGONAL LABELS
                var dayData = [
                      { "period": "2012-10-01", "licensed": 3407, "sorned": 660 },
                      { "period": "2012-09-30", "licensed": 3351, "sorned": 629 },
                      { "period": "2012-09-29", "licensed": 3269, "sorned": 618 },
                      { "period": "2012-09-20", "licensed": 3246, "sorned": 661 },
                      { "period": "2012-09-19", "licensed": 3257, "sorned": 667 },
                      { "period": "2012-09-18", "licensed": 3248, "sorned": 627 },
                      { "period": "2012-09-17", "licensed": 3171, "sorned": 660 },
                      { "period": "2012-09-16", "licensed": 3171, "sorned": 676 },
                      { "period": "2012-09-15", "licensed": 3201, "sorned": 656 },
                      { "period": "2012-09-10", "licensed": 3215, "sorned": 1622 }
                ];
                Morris.Bar({
                    element: 'bar-diagonal',
                    data: dayData,
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned'],
                    labels: ['Licensed', 'SORN'],
                    xLabelAngle: 60,
                    hideHover: 'auto'
                });
                // STACKED
                Morris.Bar({
                    element: 'stacked',
                    data: [
                      { x: '2011 Q1', y: 3, z: 2, a: 3 },
                      { x: '2011 Q2', y: 2, z: null, a: 1 },
                      { x: '2011 Q3', y: 0, z: 2, a: 4 },
                      { x: '2011 Q4', y: 2, z: 4, a: 3 }
                    ],
                    xkey: 'x',
                    ykeys: ['y', 'z', 'a'],
                    labels: ['Y', 'Z', 'A'],
                    stacked: true,
                    resize: true,
                    hideHover: 'auto'
                });

                if (config.debug) {
                    $notification.success("Bar charts loaded", "Morris Charts", config.notificationDelay);
                }

            }]);
})();
