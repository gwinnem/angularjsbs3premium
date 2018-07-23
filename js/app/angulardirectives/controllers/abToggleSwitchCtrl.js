/**
 * Directive for toggle switch input
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 */
(function () {
    "use strict";
    angular.module("abToggleSwitch", [[]])
        .controller("ToggleSwitch", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                $scope.enabled = true;
                $scope.onOff = true;
                $scope.yesNo = true;
                $scope.disabled = true;
                $scope.switchStatus = true;
                $scope.switchStatus1 = true;
                $scope.switchstatus2 = true;
                $scope.switchStatus3 = true;
                $scope.switchStatus4 = true;
                $scope.switchStatus5 = true;
                $scope.htmlSwitchStatus = true;

                if (config.debug) {
                    $notification.success("ToggleSwitch loaded", "ABAdmin Directives", config.notificationDelay);
                }
            }]);
})();
