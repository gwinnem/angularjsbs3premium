/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Only pushing the config service onto the scope.
 */
(function () {
    "use strict";
    angular.module("AB:MAIN", [[]])
        .controller("mainController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                $('.wrapper').removeClass('hidden');
                if (config.debug) {
                    $notification.success("Welcome", "ABAdmin", config.notificationDelay);
                }
            }]);
})();
