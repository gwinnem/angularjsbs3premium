/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary chosen controller
 */
(function () {
    "use strict";
    angular.module("abChosenModule", [[]])
        .controller("ChosenController", ["$notification", "config",
            function ($notification, config) {
                if (config.debug) {
                    $notification.info("Chosen loaded", "Chosen", config.notificationDelay);
                }
            }]);
})();
