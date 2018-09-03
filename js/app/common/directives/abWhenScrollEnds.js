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

                    function debounce(func, wait, immediate) {
                        var timeout;
                        return function () {
                            var context = this, args = arguments;
                            var later = function () {
                                timeout = null;
                                if (!immediate) func.apply(context, args);
                            };
                            var callNow = immediate && !timeout;
                            clearTimeout(timeout);
                            timeout = setTimeout(later, wait);
                            if (callNow) func.apply(context, args);
                        };
                    };
                    function loadMore() {
                        scope.$apply(attrs.whenScrollEnds);
                    }
                    element.bind("scroll", function () {
                        var hiddenContentHeight = element.prop("scrollHeight") - element.height();
                        if (hiddenContentHeight - element.scrollTop() <= element.height()) {
                            debounce(loadMore(), 2000);
                            //scope.$apply(attrs.whenScrollEnds);
                        }
                    });
                }
            };
        });
})();
