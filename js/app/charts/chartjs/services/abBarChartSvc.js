/**
 * abBarChartSvc.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Factory for controller ChartJsBarChartsController.
 */

(function () {
    "use strict";
    angular.module("abBarChartFactoryModule", [["js/app/charts/chartjs/abChartJsCommon.js"]])
        .factory("abBarChartFactory", ["abBarChartsCommon", function (abBarChartsCommon) {
            var baseData = {
                labels: abBarChartsCommon.monthsTo(7),
                datasets: [{
                    label: "Dataset 1",
                    backgroundColor: abBarChartsCommon.transparentize(abBarChartsCommon.chartColors.red, 0.2),
                    borderColor: abBarChartsCommon.chartColors.red,
                    borderWidth: 1,
                    data: abBarChartsCommon.getDataSet(7)
                }, {
                    label: "Dataset 2",
                    backgroundColor: abBarChartsCommon.transparentize(abBarChartsCommon.chartColors.blue, 0.2),
                    borderColor: abBarChartsCommon.chartColors.blue,
                    borderWidth: 1,
                    data: abBarChartsCommon.getDataSet(7)
                }]

            };
            return {
                baseData: baseData,
                transparentize: function (color, opacity) {
                    return abBarChartsCommon.transparentize(color, opacity);
                },
                getDataSet: function (times) {
                    return abBarChartsCommon.getDataSet(times);
                },
                chartColors: abBarChartsCommon.chartColors,
                monthsToJuly: abBarChartsCommon.monthsTo(7)
            };
        }]);
})();