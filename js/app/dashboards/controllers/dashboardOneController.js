/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Controller for Dashboard 1
 */
(function () {
    "use strict";
    angular.module("aurora", [
            ["js/app/dashboards/services/chartJsData.js"]
        ])
        .controller("DashboardOneController", ["$scope", "$notification", "config", "chartJsData", "modalDialogs",
            function ($scope, $notification, config, chartJsData, modalDialogs) {

                // Sales chart
                var salesChartCanvas = $('#salesChart').get(0).getContext('2d');
                var chart = new Chart(salesChartCanvas, chartJsData.chartConfig);

                // progress bars
                $(".progress .progress-bar").progressbar();

                // Sparklines
                $(".sparkline1").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 3, 4, 3, 4, 5, 4, 5, 4, 3], {
                    type: 'bar',
                    height: '60',
                    barWidth: 10,
                    barSpacing: 2,
                    barColor: '#26B99A',
                    tooltipFormat: '{{value}}k Hits'
                });
                $(".sparkline2").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
                    type: 'line',
                    height: '60',
                    width: '200',
                    lineColor: '#26B99A',
                    fillColor: '#ffffff',
                    lineWidth: 3,
                    spotColor: '#34495E',
                    minSpotColor: '#34495E'
                });
                $(".sparkline3").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
                    type: 'line',
                    height: '60',
                    width: '200',
                    lineColor: '#26B99A',
                    fillColor: '#ffffff',
                    lineWidth: 3,
                    spotColor: '#34495E',
                    minSpotColor: '#34495E'
                });

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

                // -----------------
                // - SPARKLINE BAR -
                // -----------------
                $('.sparkbar').each(function () {
                    var $this = $(this);
                    $this.sparkline('html', {
                        type: 'bar',
                        height: $this.data('height') ? $this.data('height') : '30',
                        barColor: $this.data('color')
                    });
                });

                if (config.debug) {
                    $notification.success("Dashboard One loaded", "Dashboards", config.notificationDelay);
                }
            }
        ]);
})();