/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Jasny controller.
 */
(function () {
    "use strict";
    angular.module("abJasnyModule", [[]])
        .controller("JasnyController", ["$notification", "config",
            function ($notification, config) {
                if (config.debug) {
                    $notification.success("Jasny inputmasks loaded", "Jasny", config.notificationDelay);
                }
            }]);
})();
