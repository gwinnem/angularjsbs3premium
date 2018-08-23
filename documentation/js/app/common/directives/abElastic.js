/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Auto resizing textarea dynamically..
 */
(function () {
    "use strict";
    angular.module("abTextAreaAutoresize", [])
        .directive("abElastic", function ($timeout) {
            return {
                restrict: "A",
                link: function ($scope, element, attrs, ctrl) {
                    element.css({ "height": "auto", "overflow-y": "hidden" });
                    $timeout(function () {
                        element.css("height", element[0].scrollHeight + "px");
                    }, 100);

                    element.on("input", function () {
                        element.css({ 'height': "auto", 'overflow-y': "hidden" });
                        element.css("height", element[0].scrollHeight + "px");

                    });
                }
            }
        });

}());