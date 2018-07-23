/**
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying a label with priority
 * Bootstrap tooltip is an optin component so in order to activate it you need to do so in the page manually.
 * $(function () { $('[data-toggle="tooltip"]').tooltip() })
 */
(function () {
    "use strict";
    angular.module("abPriorityLabel", [])
        .directive("priorityLabel", function ($compile) {
            return {
                restrict: "E",
                scope: { status: "@" },
                link: function ($scope, element) {
                    var template = function (status) {
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
                            element.replaceWith($compile(template(value))($scope));
                        }
                    });
                }
            }
        });
}());