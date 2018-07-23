/**
 * abFlotSvc.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Factory for all Flot chart controllers.
 */

(function () {
    "use strict";
    angular.module("abFlotCharts", []).factory("abFlotFactory", [function () {
            // Calculating sinus curve data.
            var getSinusCurve = function () {
                var d1 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.25) {
                    d1.push([i, Math.sin(i)]);
                }
                return d1;
            }
            //Calculating cosinus curve
            var getCosinusCurve = function () {
                var d2 = [];
                for (var i1 = 0; i1 < Math.PI * 2; i1 += 0.25) {
                    d2.push([i1, Math.cos(i1)]);
                }
                return d2;
            }
            //Calculating tangens curve
            var getTangensCurve = function () {
                var d3 = [];
                for (var i2 = 0; i2 < Math.PI * 2; i2 += 0.1) {
                    d3.push([i2, Math.tan(i2)]);
                }
                return d3;
            }

            //Generating the text used in the box footers.
            var footerText = "Flot( v." + $.plot.version + " ) Copyright 2007 - 2014 IOLA and Ole Laursen";

            return {
                footerText: footerText,
                getSinusCurve: function () {
                    return getSinusCurve();
                },
                getCosinusCurve: function () {
                    return getCosinusCurve();
                },
                getTangensCurve: function () {
                    return getTangensCurve();
                }
            };
        }]);
})();