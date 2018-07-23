/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary
 */
(function () {
    "use strict";
    angular.module("abRickshaw", [[]])
        .controller("RickshawChartsController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                //Bare minimum
                var graph = new Rickshaw.Graph({
                    element: document.querySelector("#chart"),
                    width: 300,
                    height: 200,
                    series: [{
                        color: 'steelblue',
                        data: [
                            { x: 0, y: 40 },
                            { x: 1, y: 49 },
                            { x: 2, y: 38 },
                            { x: 3, y: 30 },
                            { x: 4, y: 32 }]
                    }]
                });
                graph.render();

                //Stacked Area
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#areachart"),
                    renderer: 'area',
                    stroke: true,
                    series: [{
                        data: [{ x: 0, y: 40 },
                        { x: 1, y: 49 }],
                        color: 'steelblue'
                    }, {
                        data: [{ x: 0, y: 40 },
                        { x: 1, y: 49 }],
                        color: 'lightblue'
                    }]
                });

                graph.render();

                //Multiple Area
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#multipleareachart"),
                    renderer: 'area',
                    stroke: true,
                    series: [{
                        data: [{ x: 0, y: 40 }, { x: 1, y: 49 }],
                        color: 'rgba(192,132,255,0.3)',
                        stroke: 'rgba(0,0,0,0.15)'

                    }, {
                        data: [{ x: 0, y: 22 }, { x: 1, y: 25 }],
                        color: 'rgba(96,170,255,0.5)',
                        stroke: 'rgba(0,0,0,0.15)'
                    }]
                });
                graph.renderer.unstack = true;
                graph.render();


                //Line Chart
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#linechart"),
                    width: 235,
                    height: 85,
                    renderer: 'line',
                    series: [{
                        data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 }],
                        color: '#4682b4'
                    }]
                });
                graph.render();

                // Multiple line chart
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#multiplelinechart"),
                    width: 235,
                    height: 85,
                    renderer: 'line',
                    series: [{
                        data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 }],
                        color: '#4682b4'
                    }, {
                        data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 }],
                        color: '#9cc1e0'
                    }]
                });
                graph.render();

                // Bar Chart
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#barchart"),
                    width: 235,
                    height: 85,
                    renderer: 'bar',
                    series: [{
                        data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 }],
                        color: 'steelblue'
                    }]
                });
                graph.render();

                // Stacked Bar
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#stackedbarchart"),
                    width: 235,
                    height: 85,
                    renderer: 'bar',
                    series: [
                        {
                            data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 }],
                            color: '#4682b4'
                        }, {
                            data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 }],
                            color: '#9cc1e0'

                        }]
                });
                graph.render();

                // Multiple Bars
                graph = new Rickshaw.Graph({
                    element: document.querySelector("#multiplebarschart"),
                    width: 235,
                    height: 85,
                    renderer: 'bar',
                    stack: false,
                    series: [
                        {
                            data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 }],
                            color: '#4682b4'
                        }, {
                            data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 }],
                            color: '#9cc1e0'

                        }]
                });

                graph.render();


                if (config.debug) {
                    $notification.info("Charts loaded", "Rickshaw charts", config.notificationDelay);
                }
            }]);
})();
