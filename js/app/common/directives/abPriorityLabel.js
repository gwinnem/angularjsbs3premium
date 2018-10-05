/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying a label with priority
 */
(function () {
    "use strict";
    angular.module("ab.common.ui.prioritylabel", [])
        .directive("priorityLabel", function ($compile) {
            return {
                restrict: "E",
                scope: { status: "@" },
                link: function ($scope, element) {
                    var renderTemplate = function (status) {
                        switch (status) {
                            case 0:
                            case "0":
                            case "low":
                                {
                                    return '<span class="label label-default" title="Low Priority" data-toggle="tooltip" data-placement="top">Low</span>';
                                }
                            case 1:
                            case "1":
                            case "medium":
                                {
                                    return '<span class="label label-warning" title="Medium Priority" data-toggle="tooltip" data-placement="top">Medium</span>';
                                }
                            case 2:
                            case "2":
                            case "high":
                                {
                                    return '<span class="label label-danger" title="High Priority" data-toggle="tooltip" data-placement="top">High</span>';
                                }
                            default:
                                return "<h1>Invalid priority</h1>";
                        }
                    }
                    $scope.$watch("status", function (value) {
                        if (value !== "") {
                            element.html(renderTemplate());
                            $compile(element.contents())($scope);
                        }
                    });
                }
            }
        });
}());