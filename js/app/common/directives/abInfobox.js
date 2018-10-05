/**
 * @author Geirr Winnem
 * @summary Directive for displaying info boxes.
 */

(function () {
    "use strict";

    angular.module("ab.common.ui.infobox", [])
        .directive("infoBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attr) {
                    var renderTemplate = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }
                        var boxsolid = attr.boxsolid;
                        if (boxsolid === undefined) {
                            boxsolid = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }

                        var boxtitle = attr.boxtitle;
                        if (boxtitle === undefined) {
                            boxtitle = "";
                        }

                        var boxtitletype = attr.boxtitletype;
                        if (boxtitletype === undefined || boxtitletype === "text" || boxtitletype === "") {
                            boxtitletype = "info-box-text";
                        } else if (boxtitletype === "bold") {
                            boxtitletype = "info-box-bold";
                        }

                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var boxmessagetype = attr.boxmessagetype;
                        if (boxmessagetype === undefined || boxmessagetype === "text" || boxmessagetype === "") {
                            boxmessagetype = "info-box-text";
                        } else if (boxmessagetype === "bold") {
                            boxmessagetype = "info-box-bold";
                        }

                        var progressbarhtml = "";
                        var progress = attr.boxprogress;
                        var progressmessage = attr.boxprogresstext;
                        if (progressmessage === undefined) {
                            progressmessage = "";
                        }
                        if (progress !== undefined && progress !== "") {
                            progressbarhtml = '<div class="progress">' +
                                '<div class="progress-bar" style="width: ' + progress + '%">' +
                                '</div></div>' +
                                '<span class="progress-description">' + progressmessage + '</span>';
                        }

                        var infobox = '<div class="info-box ' + boxsolid + '">' +
                            '<span class="info-box-icon ' + boxbg + ' "><i class="' + boxicon + '"></i></span>' +
                            '<div class="info-box-content">' +
                            '<span class="' + boxtitletype + '">' + boxtitle + '</span>' +
                            '<span class="' + boxmessagetype + '">' + boxmessage + '</span>' +
                            progressbarhtml +
                            '</div></div>';
                        return infobox;
                    }
                    element.html(renderTemplate());
                    $compile(element.contents())($scope);
                }
            }
        });
})();