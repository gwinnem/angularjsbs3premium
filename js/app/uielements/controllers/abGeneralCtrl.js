/**
 * Controller for the Badges and labels page.
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 */
(function () {
    "use strict";
    angular.module("abGeneralModule", [[]])
        .controller("GeneralController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {

                if (config.debug) {
                    $notification.success("General elements loaded", "ABAdmin UIElements", config.notificationDelay);
                }
            }]);
})();
