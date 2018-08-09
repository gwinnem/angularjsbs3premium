/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Auto resizing textarea dynamically..
 */

(function () {
    "use strict";
    angular.module("ab.common.textarea.autogrow", [])
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
// (function () {
//     "use strict";
//     angular.module("abTextAreaAutoresize", [])
//         .directive("abElastic", function ($timeout) {
//             return {
//                 restrict: "A",
//                 link: function (element) {
//                     element.css({
//                         //"height": "auto;",
//                         "overflow-y": "hidden;"
//                     });
//                     var ta = element;
//                     $timeout(function () {
//                         // force text reflow
                        
//                         var text = ta.value;
//                         ta.value = '';
//                         ta.value = text;
//                         var height = ta.scrollHeight;
//                         if (height !== 0) {
//                             $(ta).css("height", height + "px;");
//                         }
//                     }, 200);

//                     element.on("input", function () {
//                         element.css({
//                             'height': "auto",
//                             'overflow-y': "hidden"
//                         });
//                         var height = ta.scrollHeight;
//                         $(ta).css("height", height + "px !important;");
//                     });
//                 }
//             };
//         });

// }());