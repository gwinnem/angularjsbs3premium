/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Factory for functionality used in all Chart.js charts.
 */

(function () {
    "use strict";
    angular.module("abBarChartsCommonModule", [])
        .factory("abBarChartsCommon", function () {

            var seed = Date.now();
            var rand = function (min, max) {
                var _seed = seed;
                min = min === undefined ? 0 : min;
                max = max === undefined ? 1 : max;
                seed = (_seed * 9301 + 49297) % 233280;
                return min + (seed / 233280) * (max - min);
            }

            var randomScalingFactor = function () {
                return Math.round(rand(-100, 100));
            };

            var getDataSet = function (times) {
                var retData = [];
                for (var index = 1; index <= times; index++) {
                    retData.push(randomScalingFactor());
                }
                return retData;
            }

            var chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            }

            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            var monthsTo = function (to) {
                var retMonths = [];
                for (var index = 0; index < to; index++) {
                    retMonths.push(months[index]);
                }
                return retMonths;
            };

            var transparentize = function (color, opacity) {
                var alpha = opacity === undefined ? 0.5 : 1 - opacity;
                return Color(color).alpha(alpha).rgbString();
            }

            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100);
            };
            return {
                chartColors: chartColors,
                monthsTo: function (times) {
                    return monthsTo(times);
                },
                transparentize: function (color, opacity) {
                    return transparentize(color, opacity);
                },
                getDataSet: function (times) {
                    return getDataSet(times);
                },
                randomScalingFactor: function () {
                    return randomScalingFactor();
                }
            }
        });
})();