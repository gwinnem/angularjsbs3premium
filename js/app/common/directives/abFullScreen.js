/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Fullscreen button directive.
 */
(function () {
    "use strict";
    angular.module('ab.common.ui.fullscreen', [])
        .directive('fullScreen',
            function() {
                return {
                    restrict: "EA",
                    replace: true,
                    template:
                        "<a href='javascript:' data-toggle='tooltip' data-placement='right' title='Fullscreen' ng-click='launchFullScreen();'><i class='fa fa-lg fa-arrows-alt'></i></a>",
                    link: function($scope) {
                        debugger;
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