/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Auto resizing textarea dynamically..
 */
(function () {
    "use strict";
    angular.module("ab.common.ui.elastic", [])
        .directive("abElastic", function ($timeout) {
            return {
                restrict: "A",
                link: function ($scope, element) {
                    element.css({ "height": "auto", "overflow-y": "hidden" });
                    $timeout(function () {
                        element.css("height", element[0].scrollHeight + "px");
                    }, 100);

                    element.on("input", function () {
                        element.css({ 'height': "auto", 'overflow-y': "hidden" });
                        element.css("height", element[0].scrollHeight + "px");

                    });
                }
            };
        });

}());