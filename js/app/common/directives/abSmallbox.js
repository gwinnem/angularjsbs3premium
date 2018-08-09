/**
 * Small box widget
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Directive for displaying small boxes.
 */

(function () {
    "use strict";

    angular.module("abSmallBox", [])
        .directive("smallBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attr) {
                    var renderTemplate = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }
                        var boxtitle = attr.boxtitle;
                        if (boxtitle === undefined) {
                            boxtitle = "";
                        }
                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var boxfooter = attr.boxfooter;
                        if (boxfooter === undefined) {
                            boxfooter = "";
                        }
                        var boxsref = attr.boxsref;
                        if (boxsref === undefined) {
                            boxsref = "";
                        } else {
                            boxsref = 'ui-sref="' + boxsref + '"';
                        }
                        var footer = '<a ' + boxsref + ' href="javascript:void(0)" class="small-box-footer">' + boxfooter + ' <i class="fa fa-arrow-circle-right"></i></a>';
                        if (boxsref === "") {
                            footer = '<div class="small-box-footer">' + boxfooter + '</div>';
                        }
                        var template = '<div class="small-box ' + boxbg + '">' +
                            '<div class="small-box-inner"><h3>' + boxtitle + '</h3><p>' + boxmessage + '</p></div>' +
                            '<div class="small-box-icon"><i class="' + boxicon + '"></i></div>' +
                            footer +
                            '</div>';
                        return template;
                    }

                    element.replaceWith($compile(renderTemplate())($scope));
                }
            }
        });
})();