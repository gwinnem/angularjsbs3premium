/**
 * @author Geirr Winnem
 * @version 0.1.0
 * @summary Used to enforce that a input element contains numbers only.
 */
(function () {
    "use strict";
    angular.module("ab.common.ui.numbersonly", [])
        .directive("numbersOnly", function () {
            return {
                require: "ngModel",
                restrict: "EA",
                link: function (scope, elm, attrs, ctrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9]/g, "");

                            if (transformedInput !== text) {
                                ctrl.$setViewValue(transformedInput);
                                ctrl.$render();
                            }
                            return transformedInput;
                        }
                        return undefined;
                    }
                    ctrl.$parsers.push(fromUser);
                }
            };
        });
})();