/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @summary Demos for the ion Rangeslider plugin.
 */
(function () {
    "use strict";
    angular.module("abRangeSliderModule", [[]])
        .controller("RangeSliderController", [ "$notification", "config",
            function ( $notification, config) {
                if (config.debug) {
                    $notification.info("Slider loaded", "ion rangeSlider", config.notificationDelay);
                }
            }]);
})();
