/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Flot dataservice
 */

(function () {
    "use strict";
    angular.module("aurora")
        .factory("chartJsData", [function () {
            var salesChartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                      label: 'Electronics',
                      fillColor: 'rgb(210, 214, 222)',
                      strokeColor: 'rgb(210, 214, 222)',
                      pointColor: 'rgb(210, 214, 222)',
                      pointStrokeColor: '#c1c7d1',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgb(220,220,220)',
                      backgroundColor: 'rgba(185, 214, 200, 0.75)',
                      data: [400, 590, 800, 805, 560, 550, 700]
                  },
                  {
                      label: 'Digital Goods',
                      fillColor: 'rgba(60,141,188,0.9)',
                      strokeColor: 'rgba(60,141,188,0.8)',
                      pointColor: '#3b8bba',
                      pointStrokeColor: 'rgba(60,141,188,1)',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(60,141,188,1)',
                      backgroundColor: 'rgb(173, 235, 173,0.60)',
                      data: [280, 480, 400, 190, 860, 270, 900]
                  }
                ]
            };

            var salesChartOptions = {
                showScale: true,
                scaleShowGridLines: false,
                scaleGridLineColor: 'rgba(0,0,0,.05)',
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                bezierCurve: true,
                bezierCurveTension: 0.3,
                pointDot: false,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: true,
                datasetStrokeWidth: 2,
                datasetFill: true,
                // String - A legend template
                legendTemplate: '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
                maintainAspectRatio: true,
                responsive: true
            };

            var chartConfig = {
                type: "line",
                data: salesChartData,
                options: salesChartOptions
            }

            return {
                chartConfig: chartConfig
            };
        }]);
})();