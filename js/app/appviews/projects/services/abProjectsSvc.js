/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Service for project lists
 */

(function () {
    "use strict";
    angular.module("ab.project.service", [[]])
        .factory("abProjectsSvc", ["$q", "abProjectDataSvc", function ($q, abProjectDataSvc) {

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
                var deferred = $q.defer();
                try {
                    var result = null;
                    angular.forEach(projects, function (detail) {
                        if (detail.id === id) {
                            result = detail;
                        }
                    });
                    deferred.resolve(result);
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            var saveProject = function (project) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = projects.find(obj => obj.id === project.id);
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

            return {
                getAll: getAll,
                getProject: getProject,
                saveProject: saveProject,
                deleteProject: deleteProject
            };
        }]);
})();