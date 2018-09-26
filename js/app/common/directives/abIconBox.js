/**
 * @author Geirr Winnem
 * @summary Directive for displaying icon boxes.
 */

(function () {
    "use strict";

    angular.module("ab.common.ui.iconbox", [])
        .directive("iconBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attrs) {
                    var attr = attrs;
                    var renderTemplate = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }
                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var template = '<div class="icon-box ' + boxbg + '">' +
                            '<span class="icon-box-icon"><i class="' + boxicon + '"></i>' +
                            '</span><div class="icon-box-text"><span>' + boxmessage + '</span></div></div>';
                        return template;
                    }

                    element.replaceWith($compile(renderTemplate())($scope));
                }
            }
        });
})();