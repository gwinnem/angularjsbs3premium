/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive template.
 */
(function () {
    "use strict";
    angular.module('abFullScreen', [])
        .directive('fullScreen',
            function() {
                return {
                    restrict: "EA",
                    replace: true,
                    template:
                        "<a href='#' data-toggle='tooltip' data-placement='right' title='Fullscreen' ng-click='launchFullScreen();'><i class='fa fa-lg fa-arrows-alt'></i></a>",
                    link: function($scope) {
                        var $body = $('body');
                        $scope.launchFullScreen = function() {
                            if (!$body.hasClass("full-screen")) {
                                $body.addClass("full-screen");
                                if (document.documentElement.requestFullscreen) {
                                    document.documentElement.requestFullscreen();
                                } else if (document.documentElement.mozRequestFullScreen) {
                                    document.documentElement.mozRequestFullScreen();
                                } else if (document.documentElement.webkitRequestFullscreen) {
                                    document.documentElement.webkitRequestFullscreen();
                                } else if (document.documentElement.msRequestFullscreen) {
                                    document.documentElement.msRequestFullscreen();
                                }
                            } else {
                                $body.removeClass("full-screen");
                                if (document.exitFullscreen) {
                                    document.exitFullscreen();
                                } else if (document.mozCancelFullScreen) {
                                    document.mozCancelFullScreen();
                                } else if (document.webkitExitFullscreen) {
                                    document.webkitExitFullscreen();
                                }
                            }
                        };
                    }
                };
            });

}());