﻿/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Different enum values used for projects
 */

(function () {
    "use strict";
    angular.module("abProjectsEnumModule", [
        []
    ])
        .factory("abProjectEnumsSvc", ["$q", function ($q) {
            var actions = {
                create: 0,
                display: 1,
                edit: 2
            }
            var projectStatus = {
                Inactive: 0,
                Active: 1,
                Completed: 2,
                Rejected: 3
            }
            var projectPriority = {
                Low: 0,
                Normal: 1,
                High: 2
            };
            var taskStatus = {
                Inactive: 0,
                Active: 1,
                Completed: 2
            }
            var taskPriority = {
                Low: 0,
                Normal: 1,
                High: 2
            };


            return {
                actions: actions,
                status: projectStatus,
                priority: projectPriority,
                taskStatus: taskStatus,
                taskPriority: taskPriority
            };
        }]);
})();