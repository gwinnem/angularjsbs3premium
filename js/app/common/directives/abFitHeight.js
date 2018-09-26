/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Helper directive to set height to window height.
 */
(function () {
    "use strict";
    angular.module('ab.common.ui.fitheight', [])
        .directive('fitHeight', function () {
            return {
                restrict: "A",
                link: function ($scope, element) {
                    element.css("height", $(window).height() + "px");
                    element.css("min-height", $(window).height() + "px");
                }
            }
        });

}());