﻿/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying Flot bar charts.
 */
(function () {
    "use strict";
    angular.module("abFlot", [[]])
        .controller("FlotBarChartsController", ["$scope", "$notification", "abFlotFactory", "config",
            function ($scope, $notification, abFlotFactory, config) {
                // Annotations barchart
                var d1 = [];
                for (var i = 0; i < 20; ++i) {
                    d1.push([i, Math.sin(i)]);
                }

                var data = [{ data: d1, label: "Pressure", color: "#333" }];

                var markings = [
                    { color: "#f6f6f6", yaxis: { from: 1 } },
                    { color: "#f6f6f6", yaxis: { to: -1 } },
                    { color: "#000", lineWidth: 1, xaxis: { from: 2, to: 2 } },
                    { color: "#000", lineWidth: 1, xaxis: { from: 8, to: 8 } }
                ];

                var placeholder = $("#bar-chart-annotations");

                var plot = $.plot(placeholder, data, {
                    bars: { show: true, barWidth: 0.5, fill: 0.9 },
                    xaxis: { ticks: [], autoscaleMargin: 0.02 },
                    yaxis: { min: -2, max: 2 },
                    grid: { markings: markings }
                });

                var o = plot.pointOffset({ x: 2, y: -1.2 });

                // Append it to the placeholder that Flot already uses for positioning

                placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Warming up</div>");

                o = plot.pointOffset({ x: 8, y: -1.2 });
                placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Actual measurements</div>");

                // Draw a little arrow on top of the last label to demonstrate canvas
                // drawing

                var ctx = plot.getCanvas().getContext("2d");
                ctx.beginPath();
                o.left += 4;
                ctx.moveTo(o.left, o.top);
                ctx.lineTo(o.left, o.top - 10);
                ctx.lineTo(o.left + 10, o.top - 5);
                ctx.lineTo(o.left, o.top);
                ctx.fillStyle = "#000";
                ctx.fill();



                // footer details
                $scope.footerText = abFlotFactory.footerText;
                if (config.debug) {
                    $notification.success("Chart loaded", "Flot", config.notificationDelay);
                }
            }]);
})();
