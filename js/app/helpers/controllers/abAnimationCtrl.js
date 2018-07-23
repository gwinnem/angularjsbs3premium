/**
 * abAnimationCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @Summary
 */
(function () {
    "use strict";
    angular.module("abAnimationHelperModule", [[]])
        .controller("AnimationHelper", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                // Animation variables
                $scope.attensionseekers = [{ name: "bounce" }, { name: "flash" }, { name: "pulse" }, { name: "rubberBand" }, { name: "shake" }, { name: "swing" }, { name: "tada" }, { name: "wobble" }];
                $scope.bouncingentrances = [{ name: "bounceIn" }, { name: "bounceInDown" }, { name: "bounceInLeft" }, { name: "bounceInRight" }, { name: "bounceInUp" }];
                $scope.bouncingexits = [{ name: "bounceOut" }, { name: "bounceOutDown" }, { name: "bounceOutLeft" }, { name: "bounceOutRight" }, { name: "bounceOutUp" }];
                $scope.fadingEntrances = [{ name: "fadeIn" }, { name: "fadeInDown" }, { name: "fadeInDownBig" }, { name: "fadeInLeft" }, { name: "fadeInLeftBig" }, { name: "fadeInRight" }, { name: "fadeInRightBig" }, { name: "fadeInUp" }, { name: "fadeInUpBig" }];
                $scope.fadingExits = [{ name: "fadeOut" }, { name: "fadeOutDown" }, { name: "fadeOutDownBig" }, { name: "fadeOutLeft" }, { name: "fadeOutLeftBig" }, { name: "fadeOutRight" }, { name: "fadeOutRightBig" }, { name: "fadeOutUp" }, { name: "fadeOutUpBig" }];
                $scope.flippers = [{ name: "flip" }, { name: "flipInX" }, { name: "flipInY" }, { name: "flipOutX" }, { name: "flipOutY" }];
                $scope.lightSpeeds = [{ name: "lightSpeedIn" }, { name: "lightSpeedOut" }];
                $scope.rotatingEntrances = [{ name: "rotateIn" }, { name: "rotateInDownLeft" }, { name: "rotateInDownRight" }, { name: "rotateInUpLeft" }, { name: "rotateInUpRight" }];
                $scope.rotatingExits = [{ name: "rotateOut" }, { name: "rotateOutDownLeft" }, { name: "rotateOutDownRight" }, { name: "rotateOutUpLeft" }, { name: "rotateOutUpRight" }];
                $scope.specials = [{ name: "hinge" }, { name: "rollIn" }, { name: "rollOut" }];
                $scope.zoomIn = [{ name: "zoomIn" }, { name: "zoomInDown" }, { name: "zoomInLeft" }, { name: "zoomInRight" }, { name: "zoomInUp" }];
                $scope.zoomOut = [{ name: "zoomOut" }, { name: "zoomOutDown" }, { name: "zoomOutLeft" }, { name: "zoomOutRight" }, { name: "zoomOutUp" }];
                $scope.animateNow = function (element, animation) {
                    $("#" + element).removeAttr("class").attr("class", "text-olive font-size-23 text-center m-b-xl");
                    $("#" + element).addClass("animated");
                    $("#" + element).addClass(animation);
                }

                if (config.debug) {
                    $notification.success("Animation helpers loaded", "Helpers", config.notificationDelay);
                }
            }]);
})();
