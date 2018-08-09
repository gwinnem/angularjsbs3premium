/**
 * Helper for loading static content
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary 
 */
(function () {
    "use strict";
    angular.module("abStaticInclude", [])
        .directive("staticInclude", ["$http", "$templateCache", "$compile", "$templateRequest", function ($http, $templateCache, $compile, $templateRequest) {
            return {
                restrict: "EA",
                //replace: true,
                link: function ($scope, element, attrs) {
 
                    $templateRequest(attrs.value).then(function (html) {
                        var template = angular.element(html);
                        // Append it to the directive element
                        $element.append(template);
                        // And let Angular $compile it
                        $compile(template)($scope);

                    }), function (message) {
                        console.log(message);
                    };
                    //debugger;
                    //$scope.$watch(attrs.value, function (newValue) {
                    //    if (!angular.isUndefined(newValue)) {
                    //        $http.get(newValue, { cache: $templateCache }).success(function (response) {
                    //            var contents = element.html(response).contents();
                    //            $compile(contents)($scope);
                    //        });
                    //    }
                    //});
                }
            }
        }]);
}());