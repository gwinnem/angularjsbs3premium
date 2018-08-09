/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying and editing project details.
 */
(function () {
    "use strict";
    angular.module("ab.project.detail", [])
        .controller("ProjectDetailsController", ["$scope", "$notification", "config", "$state",
            "abProjectsSvc", "$stateParams", "$timeout",
            "abHelpersSvc", "modalDialogs", "abCompaniesSvc", "abProjectEnumsSvc",
            function ($scope, $notification, config, $state, abProjectsSvc, $stateParams, $timeout,
                abHelpersSvc, modalDialogs, abCompaniesSvc, abProjectEnumsSvc) {

                if (config.debug) {
                    console.info("$stateParams");
                    console.log($stateParams);
                }

                $scope.editMode = false;
                $scope.project = {};
                $scope.createProject = false;

                abCompaniesSvc.getAll().then(function (data) {
                    $scope.companies = data;
                }).catch(function (message) {
                    $notification.error(message, "ABAdmin Projects", config.notificationDelay);
                });

                switch (parseInt($stateParams.action)) {
                    case abProjectEnumsSvc.actions.create:
                        {
                            $scope.editMode = true;
                            $scope.createProject = true;
                            $scope.project.id = abHelpersSvc.getNewGuid;
                            $scope.project.status = 0;
                            $scope.project.priority = 0;
                            $scope.project.progress = 1;
                            $scope.project.startDate = new Date();
                            $scope.project.endDate = new Date();
                            $scope.project.budget = "0";
                            $scope.project.budgetSpent = "0";
                            $scope.project.hours = "0";
                            $scope.project.createdBy = "9f6d66b6-fa82-498e-b9c0-7916f93f473a";
                            $scope.headerText = "New project";
                            break;
                        }
                    case abProjectEnumsSvc.actions.display:
                    case abProjectEnumsSvc.actions.edit:
                        {
                            abProjectsSvc.getProject($stateParams.id).then(function (data) {
                                $scope.project = data;
                                if (parseInt($stateParams.action) === abProjectEnumsSvc.actions.edit) {
                                    $scope.editMode = true;
                                } else {
                                    $scope.editMode = false;
                                }

                                $scope.project.startDate = new Date($scope.project.startDate);
                                $scope.project.endDate = new Date($scope.project.endDate);
                                $scope.headerText = $scope.project.name;
                                // Selected values for the select dropdowns
                                $scope.selectedClient = {
                                    id: $scope.project.clientId,
                                    name: $scope.project.clientName
                                };
                                if (config.debug) {
                                    console.log("Project details");
                                    console.log($scope.project);
                                }
                            }).catch(function (message) {
                                $notification.error(message, "ABAdmin Projects", config.notificationDelay);
                            });
                            break;
                        };
                }

                $scope.updateCompany = function (item) {
                    if (config.debug) {
                        console.log("updateCompany");
                        console.log(item);
                    }
                    $scope.project.clientId = item.id;
                    $scope.project.clientName = item.name;
                };

                $scope.addContact = function () {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.deleteContact = function (id) {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.displayContact = function (contact) {
                    var modalDefaults = {
                        size: "lg"
                    };
                    var modalOptions = {
                        model: contact,
                        headerText: contact.fullName,
                        hideOkButton: true,
                        closeButtonText: "Close",
                        contentUrl: "/js/app/appviews/projects/templates/displaycontact.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function () { });

                };
                $scope.createTask = function () {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.editTask = function (task) {
                    var modalDefaults = {
                        controller: "EditTaskController",
                        size: "lg"
                    };
                    var modalOptions = {
                        projectName: $scope.project.name,
                        projectId: $scope.project.id,
                        task: task,
                        headerText: task.title,
                        hideOkButton: false,
                        hideCloseButton: false,
                        contentUrl: "/js/app/appviews/projects/templates/addedittask.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            $scope.project.tasks = [];
                            $timeout(function () {
                                abProjectsSvc.getTasks($scope.project.id).then(function (data) {
                                    $scope.project.tasks = data;
                                });
                            });
                        }
                    });
                };

                $scope.displayTask = function (task) {
                    var modalDefaults = {
                        size: "lg"
                    };
                    var modalOptions = {
                        task: task,
                        headerText: task.title,
                        closeButtonText: "Close",
                        contentUrl: "/js/app/appviews/projects/templates/displaytask.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions);
                };

                $scope.deleteTask = function (taskId) {
                    swal("Not available in the free version!", "ABAdmin!", "success");
                };

                $scope.save = function () {
                    if (!$scope.createProject) {
                        abProjectsSvc.saveProject($scope.project).then(function () {
                            if (config.debug) {
                                $notification.success("Save succeded", "Project", config.notificationDelay);
                            }
                        }).catch(function (error) {
                            $notification.error(error, "Failed to save project.", config.notificationDelay);
                        });
                    } else {
                        swal("Not available in the free version!", "ABAdmin!", "success");
                    }
                    $state.go("projects");
                };
                $scope.edit = function () {
                    $scope.editMode = true;
                };
                $scope.cancel = function () {
                    $state.go("projects");
                };
                $scope.deleteProject = function () {
                    abProjectsSvc.deleteProject($scope.project.id)
                        .then(function () {

                        })
                        .catch(function (error) {
                            $notification.error(error, "Project delete", config.notificationDelay);
                        });
                    $state.go("projects");
                };

                // Settings and init for datepicker directive
                $scope.format = "MMMM/dd/yyyy";
                $scope.altInputFormats = ['M!/d!/yyyy'];
                $scope.popup1 = {
                    opened: false
                };
                $scope.popup2 = {
                    opened: false
                };
                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };
                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                        mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }
                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1,
                    type: {
                        Config: "datetime-local"
                    }
                };


                if (config.debug) {
                    $notification.info("Details loaded !", "Project details", config.notificationDelay);
                }

                // Bootstrap tooltip needs to be activated manually
                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                }, 500);

            }
        ]);
})();