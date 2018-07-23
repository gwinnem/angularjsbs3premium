 /**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Generating html for displaying a avatar for contacts.
 */
(function () {
    "use strict";
    angular.module('abContactAvatar', [])
        .directive('contactAvatar', function ($compile) {
            return {
                restrict: "E",
                replace: true,
                scope: { avatar: "@" },
                link: function ($scope, element, attrs) {
                    var template = function() {
                        if ($scope.avatar == undefined || $scope.avatar.length == 0) {
                            return '<img alt="avatar" class="img-circle img-bordered contact-avatar m-r-n-lg" src="/assets/img/user.png">';
                        } else {
                            return '<img alt="avatar" class="img-circle img-bordered contact-avatar m-r-n-lg" src="' + $scope.avatar + '">';
                        }
                    }
                    $scope.$watch("avatar", function () {
                            element.replaceWith($compile(template())($scope));
                    });
                }
            }
        });

}());