/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Helper directive to set height to window height.
 */
(function () {
    "use strict";
    angular.module('abFitHeight', [])
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