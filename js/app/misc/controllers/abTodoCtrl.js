/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Todo widget controller
 */
(function () {
    "use strict";
    angular.module("ab.widgets.todo-list", [[]])
        .controller("TodoWidget", ["$scope", "$notification", "config", "modalDialogs",
            function ($scope, $notification, config, modalDialogs) {
                // Javascript version
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
                $scope.changeJsTodoStatus = function (todo) {
                    $("#todo-" + todo.id).toggleClass("done");
                }

                $scope.deleteJsTodo = function (todo) {
                    modalDialogs.openConfirmDialog("Do you really want to remove this Todo?", "Remove Todo")
                        .then(function (result) {
                            if (result) {
                                var index = $scope.todos.indexOf(todo);
                                $scope.todos.splice(index, 1);
                            }
                        });
                };

                var modalOptions = {
                    hideOkButton: false,
                    okButtonText: "Update",
                    contentUrl: "js/app/common/templates/addedittodo.html"
                };
                var modalDefaults = {
                    size: ""
                };

                $scope.editJsTodo = function (todo) {
                    modalOptions.todo = todo;
                    modalOptions.headerText = "Edit TODO";
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            var index = $scope.todos.indexOf(todo);
                            $scope.todos[index] = modalOptions.todo;
                        }
                    });
                }

                $scope.addJsTodo = function (todo) {
                    modalOptions.todo = {
                        priority: "primary",
                        content: "",
                        created: new Date()
                    }
                    modalOptions.headerText = "Create New TODO";
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            $scope.todos.unshift(modalOptions.todo);
                        }
                    });
                }

                // AngularJs Directive
                // Todo list widget
                $scope.todoList = [{
                    id: 1,
                    content: "Check Emails",
                    status: 0,
                    priority: "primary",
                    createdat: ""
                },
                {
                    id: 2,
                    content: "Call TNT",
                    status: 0,
                    priority: "info",
                    createdat: ""
                },
                {
                    id: 3,
                    content: "Complete project hours",
                    status: 0,
                    priority: "danger",
                    createdat: ""
                },
                {
                    id: 4,
                    content: "SEO Optimizing",
                    status: 0,
                    priority: "danger",
                    createdat: ""
                },
                {
                    id: 5,
                    content: "Test new design",
                    status: 0,
                    priority: "warning",
                    createdat: ""
                },
                {
                    id: 6,
                    content: "Car service",
                    status: 0,
                    priority: "info",
                    createdat: ""
                },
                {
                    id: 7,
                    content: "Update new css theme",
                    status: 0,
                    priority: "success",
                    createdat: ""
                },
                {
                    id: 8,
                    content: "Hoover office",
                    status: 0,
                    priority: "primary",
                    createdat: ""
                },
                {
                    id: 9,
                    content: "Buy groceries",
                    status: 0,
                    priority: "danger",
                    createdat: ""
                },
                {
                    id: 10,
                    content: "Bring flowers to wifey",
                    status: 0,
                    priority: "warning",
                    createdat: ""
                }
                ];
                $scope.changeTodoStatus = function (todo) {
                    $("#todo-" + todo.id).toggleClass("done");
                }

                $scope.deleteTodo = function (todo) {
                    modalDialogs.openConfirmDialog("Do you really want to remove this Todo?", "Remove Todo")
                        .then(function (result) {
                            if (result) {
                                var index = $scope.todoList.indexOf(todo);
                                $scope.todoList.splice(index, 1);
                            }
                        });
                };

                var modalOptions = {
                    hideOkButton: false,
                    okButtonText: "Update",
                    contentUrl: "js/app/common/templates/addedittodo.html"
                };
                var modalDefaults = {
                    size: "lg"
                };
                $scope.editTodo = function (todo) {
                    modalOptions.todo = todo;
                    modalOptions.headerText = "Edit TODO";
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            var index = $scope.todoList.indexOf(todo);
                            $scope.todoList[index] = modalOptions.todo;
                        }
                    });
                }
                $scope.addTodo = function () {
                    modalOptions.todo = {
                        priority: "primary",
                        content: "",
                        created: new Date()
                    }
                    modalOptions.headerText = "Create New TODO";
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            $scope.todoList.unshift(modalOptions.todo);
                        }
                    });
                }
                if (config.debug) {
                    $notification.success("TODO widget loaded", "TODOs", config.notificationDelay);
                }
            }]);
})();
