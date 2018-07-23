/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Todo widget controller
 */
(function () {
    "use strict";
    angular.module("abTodoModule", [[]])
        .controller("TodoWidget", ["$scope", "$notification", "config", "modalDialogs",
            function ($scope, $notification, config, modalDialogs) {
                $scope.todos = [
                    { id: 1, content: "Check Emails", status: 0, priority: "info", createdat: "" },
                    { id: 2, content: "Call TNT", status: 0, priority: "info", createdat: "" },
                    { id: 3, content: "Complete project hours", status: 0, priority: "danger", createdat: "" },
                    { id: 4, content: "SEO Optimizing", status: 0, priority: "danger", createdat: "" },
                    { id: 5, content: "Test new design", status: 0, priority: "warning", createdat: "" },
                    { id: 6, content: "Car service", status: 0, priority: "info", createdat: "" },
                    { id: 7, content: "Update new css theme", status: 0, priority: "success", createdat: "" },
                    { id: 8, content: "Hoover office", status: 0, priority: "primary", createdat: "" },
                    { id: 9, content: "Buy groceries", status: 0, priority: "", createdat: "" },
                    { id: 10, content: "Bring flowers to wifey", status: 0, priority: "danger", createdat: "" }
                ];
                $scope.changeTodoStatus = function (todo) {
                    $("#todo-" + todo.id).toggleClass("done");
                }

                $scope.deleteTodo = function (todo) {
                    modalDialogs.openConfirmDialog("Do you really want to remove this Todo?", "Remove Todo")
                       .then(function (result) {
                           if (result) {
                               var index = $scope.todos.indexOf(todo);
                               $scope.todos.splice(index, 1);
                           }
                       });
                };

                $scope.editTodo = function (todo) {
                    alert("Functionality not implemented");
                }

                $scope.addTodo = function (todo) {
                    alert("Functionality not implemented");
                }

                if (config.debug) {
                    $notification.success("TODO widget loaded", "TODOs", config.notificationDelay);
                }
            }]);
})();
