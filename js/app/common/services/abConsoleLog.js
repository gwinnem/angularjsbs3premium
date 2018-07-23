/**
 * abConsoleLog
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Module for writing colored messages to console.log
 * Based on: https://developers.google.com/web/tools/chrome-devtools/console/
 */

(function () {
    "use strict";

    angular.module("abConsoleLog", []).factory("log", function () {
        var error = [
            'background: red',
            'color: white',
            'font-weight: bold',
            'display: block'
        ].join(';');

        var warning = [
            'background: yellow',
            'color: black',
            'font-weight: bold',
            'display: block'
        ].join(';');

        var success = [
            'background: green',
            'color: white',
            'font-weight: bold',
            'display: block'
        ].join(';');

        var info = [
            'background: blue',
            'color: white',
            'font-weight: bold',
            'display: block'
        ].join(';');


        var logError = function (message) {
            console.log("%c%s", error, message);
        };

        var logWarning = function (message) {
            console.log("%c%s", warning, message);
        };

        var logSuccess = function (message) {
            console.log("%c%s", success, message);
        };

        var logInfo = function (message) {
            console.log("%c%s", info, message);
        };

        return {
            error: logError,
            warning: logWarning,
            success: logSuccess,
            info: logInfo
        };
    });
})();
















