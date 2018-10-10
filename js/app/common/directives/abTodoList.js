/**
 * Dependencies bootstrap tooltip and jqueryUI sortable.
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary TODO List widget.
 */
(function () {
    "use strict";
    angular.module('abTodoList', [])
        .directive('todoList', function ($timeout) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "js/app/common/templates/todo-widget.html",
                link: function () {
                    $timeout(function () {
                        // jQuery plugin
                        $(".todo-list").sortable({
                            placeholder: "sort-highlight",
                            handle: ".handle",
                            forcePlaceholderSize: true,
                            revert: 200,
                            zIndex: 999999
                        }).disableSelection().on("sortchange", function (event, ui) {
                            debugger;
                        });
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                }
            }
        });
}());