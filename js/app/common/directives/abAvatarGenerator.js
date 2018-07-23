/**
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @summary Directive for generating avatars.
 */

(function () {
    "use strict";

    angular.module("abAvatar", [])
        .directive("avatarGenerator", function ($compile) {
            return {
                restrict: "E",
                scope: {
                    initials: "@initials"
                },
                link: function ($scope, element, attrs) {
                    // http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
                    function randomColor() {
                        var letters = '0123456789ABCDEF'.split('');
                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                        return color;
                    }

                    var renderTemplate = function () {
                        return "<div class='avatar' style='background-color: " + randomColor() + "'><span class='initials'>" + $scope.initials + "</span></div>";
                    }

                    element.replaceWith($compile(renderTemplate())($scope));
                }
            }
        });
})();