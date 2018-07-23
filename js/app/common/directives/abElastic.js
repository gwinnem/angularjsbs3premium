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
                link: function ($scope, element) {
                    element.css({
                        "height": "auto;",
                        "overflow-y": "hidden;"
                    });
                    $timeout(function () {
                        // force text reflow
                        var ta = element[0];
                        var text = ta.value;
                        ta.value = '';
                        ta.value = text;
                        var height = element[0].scrollHeight;
                        if (height !== 0) element.css("height", height + "px;");
                    }, 200);

                    element.on("input", function () {
                        element.css({
                            'height': "auto",
                            'overflow-y': "hidden"
                        });
                        var height = element[0].scrollHeight;
                        element.css("height", height + "px !important;");
                    });
                }
            };
        });

}());