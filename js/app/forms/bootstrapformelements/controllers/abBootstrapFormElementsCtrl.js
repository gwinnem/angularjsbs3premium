/**
 * abBootstrapFormElementsCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Bootstrap form elements controller
 */
(function () {
    "use strict";
    angular.module("abBootstrapformElementsModule", [[]])
        .controller("BootstrapformElementsController", ["$notification", "config",
            function ($notification, config) {
                if (config.debug) {
                    $notification.success("Form elements loaded", "Bootstrap Forms", config.notificationDelay);
                }
            }]);
})();
