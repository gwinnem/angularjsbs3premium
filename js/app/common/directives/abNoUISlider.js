/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Wrapper directive for jquery nouiSlider.  https://refreshless.com/nouislider/examples/
 */
(function() {
  "use strict";
  angular
    .module("ab.common.ui.nouislider", [])
    .directive("abSlider", function($timeout) {
      return {
        restrict: "A",
        require: "ngModel",
        scope: {
          start: "@",
          step: "@",
          end: "@",
          callback: "@",
          margin: "@",
          ngModel: "="
        },
        link: function(scope, element) {
          var slider = $(element)[0];
          var callback = scope.callback ? scope.callback : "slide";
          var parsedValue = null;
          $timeout(function() {
            noUiSlider.create(slider, {
              start: [scope.ngModel || parseFloat(scope.start)],
              end: parseFloat(scope.end),
              step: parseFloat(scope.step || 1),
              range: {
                min: [parseFloat(scope.start) || 0],
                max: [parseFloat(scope.end)]
              }
            });
            slider.noUiSlider.on(callback, function() {
              parsedValue = parseFloat(slider.noUiSlider.get());
              return scope.$apply(function() {
                return (scope.ngModel = parsedValue);
              });
            });

            return scope.$watch("ngModel", function(newVal, oldVal) {
              if (newVal !== parsedValue) {
                return slider.noUiSlider.set(newVal);
              }
            });
          });
        }
      };
    });
})();
