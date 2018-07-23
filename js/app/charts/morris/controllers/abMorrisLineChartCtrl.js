/**
 * abMorrisLineChartCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying Morris line charts.
 */
(function () {
    "use strict";
    angular.module("AbMorrisLineChartsModule", [[]])
        .controller("MorrisLineChartsController", ["$notification", "config",
            function ($notification, config) {

                // BASIC LINE CHART
                Morris.Line({
                    element: 'line-chart',
                    resize: true,
                    data: [
                      { y: '2011 Q1', item1: 2666 },
                      { y: '2011 Q2', item1: 2778 },
                      { y: '2011 Q3', item1: 4912 },
                      { y: '2011 Q4', item1: 3767 },
                      { y: '2012 Q1', item1: 6810 },
                      { y: '2012 Q2', item1: 5670 },
                      { y: '2012 Q3', item1: 4820 },
                      { y: '2012 Q4', item1: 15073 },
                      { y: '2013 Q1', item1: 10687 },
                      { y: '2013 Q2', item1: 8432 }
                    ],
                    xkey: 'y',
                    ykeys: ['item1'],
                    labels: ['Item 1'],
                    lineColors: ['#3c8dbc'],
                    hideHover: 'auto'
                });

                // CUSTOM HOVER
                var decimal_data = [];
                for (var x = 0; x <= 360; x += 10) {
                    decimal_data.push({
                        x: x,
                        y: 1.5 + 1.5 * Math.sin(Math.PI * x / 180).toFixed(4)
                    });
                }
                Morris.Line({
                    element: 'line-chart-custom-hover',
                    data: decimal_data,
                    xkey: 'x',
                    ykeys: ['y'],
                    labels: ['sin(x)'],
                    parseTime: false,
                    hoverCallback: function (index, options, default_content, row) {
                        return default_content.replace("sin(x)", "1.5 + 1.5 sin(" + row.x + ")");
                    },
                    xLabelMargin: 10,
                    integerYLabels: true,
                    hideHover: 'auto'
                });

                // DIAGONAL LABEL
                var data = [
                  { y: '2014', a: 50, b: 90 },
                  { y: '2015', a: 65, b: 75 },
                  { y: '2016', a: 50, b: 50 },
                  { y: '2017', a: 75, b: 60 },
                  { y: '2018', a: 80, b: 65 },
                  { y: '2019', a: 90, b: 70 },
                  { y: '2020', a: 100, b: 75 },
                  { y: '2021', a: 115, b: 75 },
                  { y: '2022', a: 120, b: 85 },
                  { y: '2023', a: 145, b: 85 },
                  { y: '2024', a: 160, b: 95 }
                ],
                config = {
                    data: data,
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Total Income', 'Total Outcome'],
                    fillOpacity: 0.6,
                    hideHover: 'auto',
                    behaveLikeLine: true,
                    resize: true,
                    pointFillColors: ['#ffffff'],
                    pointStrokeColors: ['black'],
                    lineColors: ['gray', 'red'],
                    xLabelAngle: 60
                };
                config.element = 'diagonal-label';
                Morris.Line(config);

                // Events
                var weekData = [
                    { "period": "2011 W27", "licensed": 3407, "sorned": 660 },
                    { "period": "2011 W26", "licensed": 3351, "sorned": 629 },
                    { "period": "2011 W25", "licensed": 3269, "sorned": 618 },
                    { "period": "2011 W24", "licensed": 3246, "sorned": 661 },
                    { "period": "2011 W23", "licensed": 3257, "sorned": 667 },
                    { "period": "2011 W22", "licensed": 3248, "sorned": 627 },
                    { "period": "2011 W21", "licensed": 3171, "sorned": 660 },
                    { "period": "2011 W20", "licensed": 3171, "sorned": 676 },
                    { "period": "2011 W19", "licensed": 3201, "sorned": 656 },
                    { "period": "2011 W18", "licensed": 3215, "sorned": 622 },
                    { "period": "2011 W17", "licensed": 3148, "sorned": 632 },
                    { "period": "2011 W16", "licensed": 3155, "sorned": 681 },
                    { "period": "2011 W15", "licensed": 3190, "sorned": 667 },
                    { "period": "2011 W14", "licensed": 3226, "sorned": 620 },
                    { "period": "2011 W13", "licensed": 3245, "sorned": null },
                    { "period": "2011 W12", "licensed": 3289, "sorned": null },
                    { "period": "2011 W11", "licensed": 3263, "sorned": null },
                    { "period": "2011 W10", "licensed": 3189, "sorned": null },
                    { "period": "2011 W09", "licensed": 3079, "sorned": null },
                    { "period": "2011 W08", "licensed": 3085, "sorned": null },
                    { "period": "2011 W07", "licensed": 3055, "sorned": null },
                    { "period": "2011 W06", "licensed": 3063, "sorned": null },
                    { "period": "2011 W05", "licensed": 2943, "sorned": null },
                    { "period": "2011 W04", "licensed": 2806, "sorned": null },
                    { "period": "2011 W03", "licensed": 2674, "sorned": null },
                    { "period": "2011 W02", "licensed": 1702, "sorned": null },
                    { "period": "2011 W01", "licensed": 1732, "sorned": null }
                ];
                Morris.Line({
                    element: 'line-event',
                    data: weekData,
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned'],
                    labels: ['Licensed', 'SORN'],
                    events: [
                      '2011-04',
                      '2011-08'
                    ],
                    hideHover: 'auto',
                    resize: true
                });

                // DECIMAL DATA
                var decimalData = [];
                for (var x = 0; x <= 360; x += 10) {
                    decimalData.push({
                        x: x,
                        y: Math.sin(Math.PI * x / 180).toFixed(4)
                    });
                }
                Morris.Line({
                    element: 'decimal-data',
                    data: decimalData,
                    xkey: 'x',
                    ykeys: ['y'],
                    labels: ['sin(x)'],
                    parseTime: false,
                    goals: [-1, 0, 1],
                    hideHover: 'auto',
                    resize: true
                });

                // NEGATIVE DATA
                var negData = [
                    { "period": "2011-08-12", "a": 100 },
                    { "period": "2011-03-03", "a": 75 },
                    { "period": "2010-08-08", "a": 50 },
                    { "period": "2010-05-10", "a": 25 },
                    { "period": "2010-03-14", "a": 0 },
                    { "period": "2010-01-10", "a": -25 },
                    { "period": "2009-12-10", "a": -50 },
                    { "period": "2009-10-07", "a": -75 },
                    { "period": "2009-09-25", "a": -100 }
                ];
                Morris.Line({
                    element: 'line-negative',
                    data: negData,
                    xkey: 'period',
                    ykeys: ['a'],
                    labels: ['Series A'],
                    units: '%',
                    hideHover: 'auto',
                    resize: true
                });

                //NO GRID
                Morris.Line({
                    element: 'nogrid',
                    resize: true,
                    grid: false,
                    data: [
                      { y: '2011 Q1', item1: 2666 },
                      { y: '2011 Q2', item1: 2778 },
                      { y: '2011 Q3', item1: 4912 },
                      { y: '2011 Q4', item1: 3767 },
                      { y: '2012 Q1', item1: 6810 },
                      { y: '2012 Q2', item1: 5670 },
                      { y: '2012 Q3', item1: 4820 },
                      { y: '2012 Q4', item1: 15073 },
                      { y: '2013 Q1', item1: 10687 },
                      { y: '2013 Q2', item1: 8432 }
                    ],
                    xkey: 'y',
                    ykeys: ['item1'],
                    labels: ['Item 1'],
                    lineColors: ['#3c8dbc'],
                    hideHover: 'auto'
                });

                // NON CONTINOUS
                // Null series values will break the line when rendering, missing values will be skipped
                var nonContinous = [
                  { "period": "2012-10-01", "licensed": 3407 },
                  { "period": "2012-09-30", "sorned": 0 },
                  { "period": "2012-09-29", "sorned": 618 },
                  { "period": "2012-09-20", "licensed": 3246, "sorned": 661 },
                  { "period": "2012-09-19", "licensed": 3257, "sorned": null },
                  { "period": "2012-09-18", "licensed": 3248, "other": 1000 },
                  { "period": "2012-09-17", "sorned": 0 },
                  { "period": "2012-09-16", "sorned": 0 },
                  { "period": "2012-09-15", "licensed": 3201, "sorned": 656 },
                  { "period": "2012-09-10", "licensed": 3215 }
                ];
                Morris.Line({
                    element: 'noncontinous',
                    data: nonContinous,
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned', 'other'],
                    labels: ['Licensed', 'SORN', 'Other'],
                    /* custom label formatting with `xLabelFormat` */
                    xLabelFormat: function (d) { return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); },
                    /* setting `xLabels` is recommended when using xLabelFormat */
                    xLabels: 'day'
                });

                // CONTINOUS UPDATE
                var nReloads = 0;
                function dataUpdate(offset) {
                    var ret = [];
                    for (var x = 0; x <= 360; x += 10) {
                        var v = (offset + x) % 360;
                        ret.push({
                            x: x,
                            y: Math.sin(Math.PI * v / 180).toFixed(4),
                            z: Math.cos(Math.PI * v / 180).toFixed(4)
                        });
                    }
                    return ret;
                }
                var updateLine = Morris.Line({
                    element: 'updating',
                    data: dataUpdate(0),
                    xkey: 'x',
                    ykeys: ['y', 'z'],
                    labels: ['sin()', 'cos()'],
                    parseTime: false,
                    ymin: -1.0,
                    ymax: 1.0,
                    hideHover: true
                });
                function update() {
                    nReloads++;
                    updateLine.setData(dataUpdate(5 * nReloads));
                    //$('#reloadStatus').text(nReloads + ' reloads');
                }
                setInterval(update, 100);

                if (config.debug) {
                    $notification.success("Line charts loaded", "Morris Charts", config.notificationDelay);
                }
            }]);
})();
