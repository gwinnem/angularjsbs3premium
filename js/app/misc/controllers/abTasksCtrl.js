/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Kanban widget controller
 */
(function () {
    "use strict";
    angular.module("abTasksModule", [[]])
        .controller("TasksController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                $scope.readyList = [
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'info'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'danger'
                    }
                ];
                $scope.inProgressList = [
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'info'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'danger'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'info'
                    }
                ];
                $scope.doneList = [
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'info'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'info'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'warning'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id pulvinar odio.',
                        date: '05.04.2018',
                        statusClass: 'success'
                    }
                ];

                $scope.sortableOptions = {
                    connectWith: ".connectList"
                };
                if (config.debug) {
                    $notification.success("Kanban widget loaded", "Agile Board", config.notificationDelay);
                }
            }]);
})();
