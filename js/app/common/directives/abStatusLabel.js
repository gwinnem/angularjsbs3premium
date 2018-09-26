/**
 * @author Geirr Winnem
 * @license MIT
 * @summary Creating a label showing status.
 */
(function () {
    "use strict";
    angular.module("ab.common.ui.statuslabel", [])
        .directive("statusLabel", function ($compile) {
            return {
                restrict: "E",
                scope: { status: "@" },
                link: function ($scope, element) {
                    var template = function (status) {
                        switch (status) {
                            case 0:
                            case "0":
                            case "false":
                            case "inactive":
                                {
                                    return '<span class="label label-warning text-black" title="Status Inactive" data-toggle="tooltip" data-placement="top">InActive</span>';
                                }
                            case 1:
                            case "1":
                            case "active":
                            case "true":
                                {
                                    return '<span class="label label-info" title="Status Active" data-toggle="tooltip" data-placement="top">Active</span>';
                                }
                            case 2:
                            case "2":
                            case "completed":
                                {
                                    return '<span class="label label-success" title="Status Completed" data-toggle="tooltip" data-placement="top">Completed</span>';
                                }
                            case 3:
                            case "3":
                            case "rejected":
                                {
                                    return '<span class="label label-danger">Rejected</span>';
                                }
                            default:
                                return "<h1>Invalid status</h1>";
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