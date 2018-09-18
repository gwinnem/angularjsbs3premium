/**
 * abNumbersOnly.js
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Used to enforca that a input element contains numbers only.
 */
(function() {
  "use strict";
  angular.module("abNumbersOnly", []).directive("numbersOnly", function() {
    return {
      require: "ngModel",
      restrict: "EA",
      link: function(scope, elm, attrs, ctrl) {
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
        debugger;
        ctrl.$parsers.push(fromUser);
      }
    };
  });
})();
