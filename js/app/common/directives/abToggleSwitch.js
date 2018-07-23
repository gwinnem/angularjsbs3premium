/**
 * Toggle switch widget
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 */
angular.module("abToggleSwitch", ["ng"])
    .directive("toggleSwitch", ["$compile", "$rootScope", "$timeout", function ($compile, $rootScope) {
        return {
            restrict: "EA",
            replace: true,
            require: "ngModel",
            scope: {
                switchId: "=",
                isDisabled: "@",
                broadCast: "@",
                onLabel: "@",
                offLabel: "@",
                knobLabel: "@",
                html: "=",
                onChange: "&"
            },
            template:
                        '<div class="ats-switch" ng-click="toggle()" ng-keypress="onKeyPress($event)" ng-class="{ \'disabled\': isDisabled }" role="switch" aria-checked="{{!!model}}">' +
                            '<div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
                                '<span class="switch-left"></span>' +
                                '<span class="knob"></span>' +
                                '<span class="switch-right"></span>' +
                            '</div>' +
                        '</div>',
            compile: function (element, attrs) {

                if (angular.isUndefined(attrs.onLabel)) {
                    attrs.onLabel = "On";
                }
                if (angular.isUndefined(attrs.offLabel)) {
                    attrs.offLabel = "Off";
                }
                if (angular.isUndefined(attrs.knobLabel)) {
                    attrs.knobLabel = "\u00a0";
                }
                if (angular.isUndefined(attrs.isDisabled)) {
                    attrs.isDisabled = false;
                }
                if (angular.isUndefined(attrs.html)) {
                    attrs.html = false;
                }
                if (angular.isUndefined(attrs.tabindex)) {
                    attrs.tabindex = 0;
                }

                if (angular.isUndefined(attrs.broadCast)) {
                    attrs.broadCast = false;
                } else {
                    attrs.broadCast = true;
                }

                if (angular.isUndefined(attrs.switchId)) {
                    attrs.switchId = 0;
                }

                return function postLink(scope, iElement, iAttrs, ngModel) {
                    iElement.attr("tabindex", attrs.tabindex);

                    scope.toggle = function () {
                        if (!scope.isDisabled) {
                            scope.model = !scope.model;
                            ngModel.$setViewValue(scope.model);
                            if (scope.broadCast) {
                                $rootScope.$broadcast("ab-toggle-switch", {
                                    toggleValue: scope.model,
                                    switchId: scope.switchId
                                });
                            }
                        }
                    };
                    
                    var spaceCharCode = 32;
                    scope.onKeyPress = function ($event) {
                        if ($event.charCode === spaceCharCode && !$event.altKey && !$event.ctrlKey && !$event.metaKey) {
                            scope.toggle();
                            $event.preventDefault();
                        }
                    };

                    ngModel.$formatters.push(function (modelValue) {
                        return modelValue;
                    });

                    ngModel.$parsers.push(function (viewValue) {
                        return viewValue;
                    });

                    ngModel.$viewChangeListeners.push(function () {
                        scope.$eval(attrs.ngChange);
                    });

                    ngModel.$render = function () {
                        scope.model = ngModel.$viewValue;
                    };

                    var bindSpan = function (span, html) {
                        span = angular.element(span);
                        var bindAttributeName = (html === true) ? "ng-bind-html" : "ng-bind";

                        // remove old ng-bind attributes
                        span.removeAttr("ng-bind-html");
                        span.removeAttr("ng-bind");

                        if (angular.element(span).hasClass("switch-left"))
                            span.attr(bindAttributeName, "onLabel");
                        if (span.hasClass("knob"))
                            span.attr(bindAttributeName, "knobLabel");
                        if (span.hasClass("switch-right"))
                            span.attr(bindAttributeName, "offLabel");

                        $compile(span)(scope, function (cloned) {
                            span.replaceWith(cloned);
                        });
                    };

                    // add ng-bind attribute to each span element.
                    var bindSwitch = function (innerElement, html) {
                        angular.forEach(innerElement[0].children[0].children,
                            function (span) {
                                bindSpan(span, html);
                            });
                    };

                    scope.$watch("html", function (newValue) {
                        bindSwitch(iElement, newValue);
                    });
                };
            }
        };
    }]);
