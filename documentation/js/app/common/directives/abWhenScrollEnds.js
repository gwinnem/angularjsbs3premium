/**
 * abWhenScrollEnds.js
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Used for loading elements in a list when scroll is close to the bottom of the element.
 */
(function () {
    "use strict";
    angular.module("abWhenScrollEnds", [])
        .directive("whenScrollEnds", function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.bind("scroll", function () {
                        var hiddenContentHeight = element.prop("scrollHeight") - element.height();
                        if (hiddenContentHeight - element.scrollTop() <= element.height()) {
                            scope.$apply(attrs.whenScrollEnds);
                        }
                    });
                }
            };
        });
})();
