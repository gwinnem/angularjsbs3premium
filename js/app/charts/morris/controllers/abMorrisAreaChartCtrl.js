/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Morris area charts.
 */
(function () {
    "use strict";
    angular.module("AbMorrisAreaChartsModule", [[]])
        .controller("MorrisAreaChartsController", ["$notification", "config",
            function ($notification, config) {
                // AREA CHART 1
                var area = new Morris.Area({
                    element: 'revenue-chart',
                    resize: true,
                    data: [
                      { y: '2011 Q1', item1: 2666, item2: 2666 },
                      { y: '2011 Q2', item1: 2778, item2: 2294 },
                      { y: '2011 Q3', item1: 4912, item2: 1969 },
                      { y: '2011 Q4', item1: 3767, item2: 3597 },
                      { y: '2012 Q1', item1: 6810, item2: 1914 },
                      { y: '2012 Q2', item1: 5670, item2: 4293 },
                      { y: '2012 Q3', item1: 4820, item2: 3795 },
                      { y: '2012 Q4', item1: 15073, item2: 5967 },
                      { y: '2013 Q1', item1: 10687, item2: 4460 },
                      { y: '2013 Q2', item1: 8432, item2: 5713 }
                    ],
                    xkey: 'y',
                    ykeys: ['item1', 'item2'],
                    labels: ['Item 1', 'Item 2'],
                    lineColors: ['#a0d0e0', '#3c8dbc'],
                    hideHover: 'auto'
                });

                // AREA CHART 2
                Morris.Area({
                    element: 'area-line',
                    behaveLikeLine: true,
                    data: [
                      { x: '2011 Q1', y: 3, z: 3 },
                      { x: '2011 Q2', y: 2, z: 1 },
                      { x: '2011 Q3', y: 2, z: 4 },
                      { x: '2011 Q4', y: 3, z: 3 }
                    ],
                    xkey: 'x',
                    ykeys: ['y', 'z'],
                    labels: ['Y', 'Z'],
                    hideHover: 'auto'
                });

                // AREA CHART 3
                Morris.Area({
                    element: 'area-click',
                    data: [
                      { x: '2010 Q4', y: 3, z: 7 },
                      { x: '2011 Q1', y: 3, z: 4 },
                      { x: '2011 Q2', y: null, z: 1 },
                      { x: '2011 Q3', y: 2, z: 5 },
                      { x: '2011 Q4', y: 8, z: 2 },
                      { x: '2012 Q1', y: 4, z: 4 }
                    ],
                    xkey: 'x',
                    ykeys: ['y', 'z'],
                    labels: ['Y', 'Z'],
                    hideHover: 'auto'
                }).on('click', function (i, row) {
                    console.log(i, row);
                });
                if (config.debug) {
                    $notification.success("Area charts loaded", "Morris Charts", config.notificationDelay);
                }

            }]);
})();
