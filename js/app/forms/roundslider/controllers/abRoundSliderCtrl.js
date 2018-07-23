/**
 * abRoundSliderCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Demos for the RoudSlider plugin.
 */
(function () {
    "use strict";
    angular.module("abRoundSliderModule", [[]])
        .controller("RoundSliderController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                if (config.debug) {
                    $notification.success("Round Slider loaded", "Round Slider", config.notificationDelay);
                }
            }]);
})();
