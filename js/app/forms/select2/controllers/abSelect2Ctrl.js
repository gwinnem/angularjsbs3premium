/**
 * abSelect2Ctrl.js.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary select2 controller
 */
(function () {
    "use strict";
    angular.module("abSelect2Module", [[]])
        .controller("Select2Controller", ["$notification", "config",
            function ($notification, config) {
                $(function () {
                    // Select2
                    $('.select2').select2();
                });
                if (config.debug) {
                    $notification.info("Select2 loaded", "Select2", config.notificationDelay);
                }
            }]);
})();
