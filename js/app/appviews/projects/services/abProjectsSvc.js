/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Service for project lists
 */

(function () {
    "use strict";
    angular.module("ab.project.service", [])
        .factory("abProjectsSvc", ["$q", "abProjectDataSvc",
            function ($q, abProjectDataSvc) {
                var projects = [];
                if (projects.length === 0) {
                    // only load dummy data once
                    projects = abProjectDataSvc.projects;
                }
                var getAll = function () {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        deferred.resolve(projects);
                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                // async operation would be a call to a server side operation in a real world scenario.
                var getProject = function (id) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var result = projects.findIndex(obj => obj.id === id);
                        if (result !== null && result !== undefined) {
                            deferred.resolve(projects[result]);
                        } else {
                            deferred.resolve("ERROR");
                        }

                    } catch (error) {
                        deferred.reject(error);
                    }
                    return deferred.promise;
                };
                var createProject = function (project) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        projects.push(project);
                        deferred.resolve(projects);
                    } catch (error) {
                        deferred.reject(error);
                    }
                    return deferred.promise;
                };
                var saveProject = function (project) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var result = projects.findIndex(obj => obj.id === project.id);
                        if (result !== null && result !== undefined) {
                            projects[result] = project;
                            deferred.resolve(projects);
                        } else {
                            deferred.resolve("ERROR");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                var deleteProject = function (id) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var index = projects.findIndex((obj => obj.id === id));
                        if (index >= 0) {
                            projects.splice(index, 1);
                        }
                        if (index > 0) {
                            deferred.resolve("OK");
                        } else {
                            deferred.resolve("ERROR");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                var updateTask = function (project, task) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var projectIndex = projects.findIndex(obj => obj.id === project.id);
                        if (projectIndex !== null && projectIndex !== undefined && projectIndex >= 0) {
                            // get the task and update it
                            var taskIndex = project.tasks.findIndex(obj => obj.id === task.id);
                            if (taskIndex !== null && taskIndex !== undefined && taskIndex >= 0) {
                                project.tasks[taskIndex] = task;
                                projects[projectIndex] = project;
                                deferred.resolve(project);
                            } else {
                                deferred.reject("ERROR not able to find project task.");
                            }
                        } else {
                            deferred.reject("ERROR not able to find project.");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                var deleteTask = function (project, taskId) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var projectIndex = projects.findIndex(obj => obj.id === project.id);
                        if (projectIndex !== null && projectIndex !== undefined && projectIndex >= 0) {
                            // get the task and update it
                            var taskIndex = project.tasks.findIndex(obj => obj.id === taskId);
                            if (taskIndex !== null && taskIndex !== undefined && taskIndex >= 0) {
                                project.tasks.splice(taskIndex, 1);
                                projects[projectIndex] = project;
                                deferred.resolve(project);
                            } else {
                                deferred.reject("ERROR not able to find project task.");
                            }
                        } else {
                            deferred.reject("ERROR not able to find project.");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                var createTask = function (project, task) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var projectIndex = projects.findIndex(obj => obj.id === project.id);
                        if (projectIndex !== null && projectIndex !== undefined && projectIndex >= 0) {
                            projects[projectIndex].tasks.push(task);
                            deferred.resolve("OK");
                        } else {
                            deferred.reject("ERROR not able to find project.");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };
                var deleteContact = function (project, contact) {
                    // async operation would be a call to a server side operation in a real world scenario.
                    var deferred = $q.defer();
                    try {
                        var projectIndex = projects.findIndex(obj => obj.id === project.id);
                        if (projectIndex !== null && projectIndex !== undefined && projectIndex >= 0) {
                            // get the task and update it
                            var contactIndex = project.contacts.findIndex(obj => obj.id === contact.id);
                            if (contactIndex !== null && contactIndex !== undefined && contactIndex >= 0) {
                                project.contacts.splice(contactIndex, 1);
                                projects[projectIndex] = project;
                                deferred.resolve(project);
                            } else {
                                deferred.reject("ERROR not able to find project contact.");
                            }
                        } else {
                            deferred.reject("ERROR not able to find project.");
                        }

                    } catch (e) {
                        deferred.reject(e);
                    }
                    return deferred.promise;
                };

                var addContacts = function (project) {
                    return saveProject(project);
                }
                return {
                    getAll: getAll,
                    getProject: getProject,
                    saveProject: saveProject,
                    createProject: createProject,
                    deleteProject: deleteProject,
                    updateTask: updateTask,
                    deleteTask: deleteTask,
                    createTask: createTask,
                    deleteContact: deleteContact,
                    addContacts: addContacts
                };
            }]);
})();