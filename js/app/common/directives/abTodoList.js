/**
 * Dependencies bootstrap tooltip and jqueryUI sortable.
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
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
                        // jQuery plugins
                        $(".todo-list").sortable({
                            placeholder: "sort-highlight",
                            handle: ".handle",
                            forcePlaceholderSize: true,
                            revert: 200,
                            zIndex: 999999
                        }).disableSelection();
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                }
            }
        });
}());