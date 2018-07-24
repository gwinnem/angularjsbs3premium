/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Navbar dropdown list for notifications.
 */
(function () {
    'use strict;'
    angular.module("ab.common.dropdown.notification", [])
        .directive("dropdownNotification", function ($compile) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    notifications: "@notifications"
                },
                link: function ($scope, element) {
                    var template = function () {

                    };

                    element.replaceWith($compile(template())($scope));
                }
            };

        });
});