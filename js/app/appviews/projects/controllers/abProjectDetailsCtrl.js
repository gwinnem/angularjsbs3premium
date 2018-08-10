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
            "abContactsSvc",
            function ($scope, $notification, config, $state, abProjectsSvc, $stateParams, $timeout,
                abHelpersSvc, modalDialogs, abCompaniesSvc, abProjectEnumsSvc, abContactsSvc) {

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
                    abContactsSvc.getAllContacts()
                        .then(function (contacts) {
                            if (config.debug) {
                                console.log("Add Contacts");
                                console.log(contacts);
                            }
                            // Only when there is no backend
                            angular.forEach(contacts, function (contact) {
                                contact.checked = false;
                            });

                            var modalDefaults = {
                                controller: "addContactsController",
                                size: ""
                            };
                            var modalOptions = {
                                model: contacts,
                                project: $scope.project,
                                headerText: "Add Contacts",
                                hideOkButton: false,
                                contentUrl: "js/app/appviews/projects/templates/addContacts.html"
                            };

                            modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                                if (result) {
                                    abProjectsSvc.getProject($scope.project.id)
                                        .then(function (result) {
                                            $scope.project = result;
                                        })
                                        .catch(function (error) {
                                            $notification.error(error, "Project add contacts failed", config.notificationDelay);
                                        });
                                }
                            });
                        }).catch(function (error) {
                            $notification.error(error, "Add Contacts failed", config.notificationDelay);
                        });
                };

                $scope.deleteContact = function (contact) {
                    modalDialogs.openConfirmDialog("Do you really want to delete this contact?", "Delete Confirmation")
                        .then(function (result) {
                            if (result) {
                                abProjectsSvc.deleteContact($scope.project, contact)
                                    .then(function (data) {
                                        $scope.project = data;
                                        $notification.success("Delete Contact", "Success", config.notificationDelay);
                                    }).catch(function (error) {
                                        $notification.error(error, "Delete contact failed!", config.notificationDelay);
                                    });
                            }
                        });
                };

                $scope.displayContact = function (contact) {
                    var modalDefaults = {
                        size: "lg"
                    };
                    var modalOptions = {
                        model: contact,
                        headerText: contact.firstName + " " + contact.lastName,
                        hideOkButton: true,
                        closeButtonText: "Close",
                        contentUrl: "/js/app/appviews/projects/templates/displaycontact.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function () { });

                };
                $scope.createTask = function () {
                    var modalDefaults = {
                        controller: "AddTaskController",
                        size: "lg"
                    };
                    var modalOptions = {
                        project: $scope.project,
                        task: {},
                        headerText: "Create new task",
                        hideOkButton: false,
                        hideCloseButton: false,
                        contentUrl: "/js/app/appviews/projects/templates/addedittask.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions)
                        .then(function (result) {
                            if (result) {
                                $timeout(function () {
                                    abProjectsSvc.getProject($scope.project.id).then(function (data) {
                                        $scope.project = data;
                                    });
                                });
                            }
                        }).catch(function (error) {
                            $notification.error(error, "Create task failed", config.notificationDelay);
                        });
                };

                $scope.editTask = function (task) {
                    var modalDefaults = {
                        controller: "EditTaskController",
                        size: "lg"
                    };
                    var modalOptions = {
                        project: $scope.project,
                        task: task,
                        headerText: task.title,
                        hideOkButton: false,
                        hideCloseButton: false,
                        contentUrl: "/js/app/appviews/projects/templates/addedittask.html"
                    };
                    modalDialogs.openDialog(modalDefaults, modalOptions).then(function (result) {
                        if (result) {
                            $timeout(function () {
                                abProjectsSvc.getProject($scope.project.id).then(function (data) {
                                    $scope.project = data;
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

                $scope.deleteTask = function (task) {
                    modalDialogs.openConfirmDialog("Do you really want to delete this task?", "Delete Confirmation")
                        .then(function (result) {
                            if (result) {
                                abProjectsSvc.deleteTask($scope.project, task.id).then(function (data) {
                                    $scope.project = data;
                                    $notification.success("Delete Task", "Success", config.notificationDelay);
                                }).catch(function (error) {
                                    $notification.error(error, "Delete task failed!", config.notificationDelay);
                                });
                            }
                        });

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
                        abProjectsSvc.createProject($scope.project)
                            .then(function () {

                            })
                            .catch(function (error) {
                                $notification(error, "Failed to create project", config.notificationDelay);
                            });
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
                    modalDialogs.openConfirmDialog("Do you really want to delete this project?", "Delete Confirmation")
                        .then(function (result) {
                            if (result) {
                                abProjectsSvc.deleteProject($scope.project.id)
                                    .then(function () {
                                        $state.go("projects");
                                    })
                                    .catch(function (error) {
                                        $notification.error(error, "Project delete", config.notificationDelay);
                                    });
                            }
                        });
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