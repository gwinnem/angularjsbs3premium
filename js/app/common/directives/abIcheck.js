/**
* iCheck directive
* @author Geirr Winnem
* @summary 
*/
(function () {
    "use strict";
    angular.module("ab.common.ui.icheck", [])
        .directive("icheck", function ($timeout) {
            return {
                require: "ngModel",
                scope: {
                    theme: "@",
                    color: "@",
                    value: "@"
                },
                link: function ($scope, element, $attrs, ngModel) {
                    var defaultTheme = "square";
                    if ($scope.theme !== undefined && $scope.theme !== "") {
                        defaultTheme = $scope.theme;
                    }
                    var defaultColor = "green";
                    if ($scope.color !== undefined && $scope.color !== "") {
                        defaultColor = $scope.color;
                    }

                    $scope.$watch($attrs["ngModel"], function () {
                        if (ngModel.$viewValue == $scope.value) {
                            $(element).iCheck('check');
                        }
                    });

                    ngModel.$render = function () {
                        $timeout(function () {
                            if (!$(element).attr("type") === "radio" && $attrs["ngModel"]) {
                                if (ngModel.$viewValue) {
                                    $(element).iCheck("check");
                                } else {
                                    $(element).iCheck("uncheck");
                                }
                            }
                        });
                    };

                    return $(element).iCheck({
                        checkboxClass: "icheckbox_" + defaultTheme + "-" + defaultColor,
                        radioClass: "iradio_" + defaultTheme + "-" + defaultColor

                    }).on("ifChanged", function (event) {
                        if ($(element).attr("type") === "checkbox" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(event.target.checked);
                            });
                        }
                    }).on("ifClicked", function () {
                        if ($(element).attr("type") === "radio" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                //set up for radio buttons to be de-selectable
                                if (ngModel.$viewValue !== $scope.value) {
                                    ngModel.$setViewValue($scope.value);
                                } else {
                                    ngModel.$setViewValue(null);
                                }
                                ngModel.$render();
                            });
                        }
                    });
                }
            };
        });
}());