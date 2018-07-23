/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Service for project data
 */

(function () {
    "use strict";
    angular.module("abProjectDetailsModule", [
            []
        ])
        .factory("abProjectDetailsSvc", ["$q", function ($q) {
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

            var projectdetails = [{
                    "description": "Discussing new web site",
                    "budget": 0.0,
                    "budgetSpent": 0.0,
                    "hours": 2,
                    "clientId": "afebfc33-9336-496d-9151-3308f24acc6b",
                    "clientName": "Billa",
                    "projectManagerId": "16cb4fad-6a91-475c-8441-4bd33ebb70ce",
                    "projectManagerFullName": "Mr Florian Scmith",
                    "createdAt": "2018-07-01T16:39:10.023",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T17:12:35.54",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "fc8eda73-5ee3-4ca8-8e3c-2322d62ac618",
                        "title": "Project Manager",
                        "salutation": "Mrs",
                        "fullName": "Mrs Katja Schneider",
                        "email": "schneider@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }],
                    "tasks": [],
                    "id": "6ebe459b-34c8-462a-a920-c5fab14ccdad",
                    "name": "Client meeting",
                    "progress": 100,
                    "status": 2,
                    "priority": 0,
                    "startDate": "2018-07-01T04:38:41",
                    "endDate": "2018-07-01T04:38:41"
                },
                {
                    "description": "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terr.",
                    "budget": 2300.0,
                    "budgetSpent": 1500.0,
                    "hours": 200,
                    "clientId": "ccf73f33-745e-41ca-8430-53c5eae042b0",
                    "clientName": "Winnem Consulting",
                    "projectManagerId": "fc8eda73-5ee3-4ca8-8e3c-2322d62ac618",
                    "projectManagerFullName": "Mrs Katja Schneider",
                    "createdAt": "2018-03-24T15:08:29.467",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T07:38:07.93",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "755ba030-d183-4aff-bbdd-bd9ad542570f",
                        "title": "Graphic Designer",
                        "salutation": "Mr",
                        "fullName": "Mr Viktor Lemke",
                        "email": "lemke@abadmin.com",
                        "phone": "+44 699 123 45 67",
                        "mobile": "+44 699 123 45 67"
                    }, {
                        "id": "84db2e98-1a60-467e-b6e7-d49d8c12e5f8",
                        "title": "CEO",
                        "salutation": "Mrs",
                        "fullName": "Mrs Marleen Metzger",
                        "email": "metzger@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }],
                    "tasks": [{
                        "id": "65316841-4836-4ddd-972e-5b72023b5cd8",
                        "projectId": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-04-01T02:53:10",
                        "endDate": "2018-04-27T02:53:10",
                        "title": "Preparing software",
                        "description": "Building software packages for automatically distribution.",
                        "hours": 10
                    }],
                    "id": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "name": "New Workstations",
                    "progress": 21,
                    "status": 1,
                    "priority": 1,
                    "startDate": "2018-04-07T21:08:29",
                    "endDate": "2018-06-20T21:08:29"
                },
                {
                    "description": "Creating new project manager app based on clients existing one.",
                    "budget": 200000.0,
                    "budgetSpent": 10000.0,
                    "hours": 1000,
                    "clientId": "00000000-0000-0000-0000-000000000000",
                    "clientName": null,
                    "projectManagerId": "00000000-0000-0000-0000-000000000000",
                    "projectManagerFullName": "  ",
                    "createdAt": "2018-07-01T16:03:15.48",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T17:12:45.73",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "fc8eda73-5ee3-4ca8-8e3c-2322d62ac618",
                        "title": "Project Manager",
                        "salutation": "Mrs",
                        "fullName": "Mrs Katja Schneider",
                        "email": "schneider@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }, {
                        "id": "16cb4fad-6a91-475c-8441-4bd33ebb70ce",
                        "title": "Student",
                        "salutation": "Mr",
                        "fullName": "Mr Florian Scmith",
                        "email": "fs@acme.com",
                        "phone": null,
                        "mobile": null
                    }, {
                        "id": "48721577-bdbf-4ac4-a416-0c7bd1e5e6c4",
                        "title": "Designer",
                        "salutation": "Mrs",
                        "fullName": "Mrs Rikke Sørensen",
                        "email": "rsoerensen@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }, {
                        "id": "afebfc33-9336-496d-9151-3308f24acc6b",
                        "title": "Senior Developer",
                        "salutation": "Mr",
                        "fullName": "Mr Geirr Winnem",
                        "email": "gwinnem@abadmin.com",
                        "phone": "+43 699 123 45 67",
                        "mobile": "+43 699 123 45 67"
                    }],
                    "tasks": [{
                        "id": "625865d7-e695-40de-b07a-c67d2c4f8f7f",
                        "projectId": "42056b31-a07b-4d0a-bccd-a6296426f04a",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-07-01T14:03:29",
                        "endDate": "2018-07-09T14:03:29",
                        "title": "Requirements",
                        "description": "Define requirements with client",
                        "hours": 40
                    }, {
                        "id": "575f7fa6-5fd5-49a6-9e6a-5311976bc05c",
                        "projectId": "42056b31-a07b-4d0a-bccd-a6296426f04a",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-07-01T14:04:02",
                        "endDate": "2018-07-01T14:04:02",
                        "title": "Define team",
                        "description": "Put together development team",
                        "hours": 2
                    }, {
                        "id": "5b40ba85-7850-49e2-9256-19e17e6dea73",
                        "projectId": "42056b31-a07b-4d0a-bccd-a6296426f04a",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-07-01T14:04:26",
                        "endDate": "2018-07-01T14:04:26",
                        "title": "Assign scrum master",
                        "description": null,
                        "hours": 1
                    }],
                    "id": "42056b31-a07b-4d0a-bccd-a6296426f04a",
                    "name": "Project manager web application",
                    "progress": 3,
                    "status": 1,
                    "priority": 0,
                    "startDate": "2018-07-01T10:02:23",
                    "endDate": "2018-09-14T10:02:23"
                },
                {
                    "description": "Latest release fo resharper must be tested and price negatioated before ordering licenses.\nThis textarea is automatically resizing when text is more than 3 row.",
                    "budget": 1500.0,
                    "budgetSpent": 10.0,
                    "hours": 50,
                    "clientId": "3ba81621-a24b-4df4-b585-a6fde465707e",
                    "clientName": "Audi Norway",
                    "projectManagerId": "755ba030-d183-4aff-bbdd-bd9ad542570f",
                    "projectManagerFullName": "Mr Viktor Lemke",
                    "createdAt": "2018-04-02T07:48:54.99",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-04-03T06:13:06.12",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "5dbf8d7f-d9a1-4709-b649-175d0c3c79f6",
                        "title": "Chief Technical Officer",
                        "salutation": "Mr",
                        "fullName": "Mr Mikkel Mortensen",
                        "email": "mortensen@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }, {
                        "id": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                        "title": "Student",
                        "salutation": "Mrs",
                        "fullName": "Mrs Maren Winnem",
                        "email": "maren@abadmin.com",
                        "phone": null,
                        "mobile": null
                    }],
                    "tasks": [{
                        "id": "0f2e1c74-f97f-48f8-b987-21288226a47a",
                        "projectId": "07169268-57db-4e11-bec6-4c119f85aa8e",
                        "status": 1,
                        "priority": 0,
                        "startDate": "2018-04-02T01:49:04",
                        "endDate": "2018-04-25T01:49:04",
                        "title": "Test version",
                        "description": null,
                        "hours": 20
                    }, {
                        "id": "b57492f4-adf9-469e-a40f-e82b58c3b283",
                        "projectId": "07169268-57db-4e11-bec6-4c119f85aa8e",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-04-25T03:49:29",
                        "endDate": "2018-04-25T03:49:29",
                        "title": "Request budget",
                        "description": null,
                        "hours": 2
                    }, {
                        "id": "588a6a25-0818-4b41-b9b9-550aec6f9535",
                        "projectId": "07169268-57db-4e11-bec6-4c119f85aa8e",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-04-25T23:50:05",
                        "endDate": "2018-04-25T23:50:05",
                        "title": "Order  licenses",
                        "description": null,
                        "hours": 1
                    }, {
                        "id": "0d6748df-292a-44b9-bf4f-386958e9fe3f",
                        "projectId": "07169268-57db-4e11-bec6-4c119f85aa8e",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-04-27T05:51:16",
                        "endDate": "2018-04-27T05:51:16",
                        "title": "Distribute licenses",
                        "description": null,
                        "hours": 1
                    }],
                    "id": "07169268-57db-4e11-bec6-4c119f85aa8e",
                    "name": "Testing new software version",
                    "progress": 37,
                    "status": 0,
                    "priority": 0,
                    "startDate": "2018-04-01T13:47:42",
                    "endDate": "2018-04-11T13:47:42"
                },
                {
                    "description": "lorum",
                    "budget": 0.0,
                    "budgetSpent": 0.0,
                    "hours": 0,
                    "clientId": "ccf73f33-745e-41ca-8430-53c5eae042b0",
                    "clientName": "Winnem Consulting",
                    "projectManagerId": "00000000-0000-0000-0000-000000000000",
                    "projectManagerFullName": "  ",
                    "createdAt": "2018-07-01T17:08:42.69",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T17:13:18.66",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [],
                    "tasks": [],
                    "id": "a9ffd5c6-dd0b-4514-89df-768bd597b7e8",
                    "name": "Testing new web api",
                    "progress": 100,
                    "status": 2,
                    "priority": 2,
                    "startDate": "2018-07-01T13:08:01",
                    "endDate": "2018-11-21T15:08:01"
                },
                {
                    "description": "New web api version",
                    "budget": 2000.0,
                    "budgetSpent": 500.0,
                    "hours": 50,
                    "clientId": "5a60e4f8-d2d3-4ecf-99d7-7f6270b56aad",
                    "clientName": "Bipa",
                    "projectManagerId": "00000000-0000-0000-0000-000000000000",
                    "projectManagerFullName": "  ",
                    "createdAt": "2018-07-01T17:07:56.623",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T17:13:55.573",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "48721577-bdbf-4ac4-a416-0c7bd1e5e6c4",
                        "title": "Designer",
                        "salutation": "Mrs",
                        "fullName": "Mrs Rikke Sørensen",
                        "email": "rsoerensen@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }],
                    "tasks": [],
                    "id": "1c17ab22-47f2-4671-b107-ecaac22448f7",
                    "name": "Updating web api",
                    "progress": 9,
                    "status": 0,
                    "priority": 1,
                    "startDate": "2018-07-01T13:07:12",
                    "endDate": "2018-09-14T13:07:12"
                },
                {
                    "description": "lorum",
                    "budget": 9900.0,
                    "budgetSpent": 2000.0,
                    "hours": 400,
                    "clientId": "00000000-0000-0000-0000-000000000000",
                    "clientName": null,
                    "projectManagerId": "00000000-0000-0000-0000-000000000000",
                    "projectManagerFullName": "  ",
                    "createdAt": "2018-07-01T15:59:27.1",
                    "createdBy": "9f6d66b6-fa82-498e-b9c0-7916f93f473a",
                    "createdByFullName": "Silvia Winnem",
                    "updatedAt": "2018-07-01T16:02:17.35",
                    "updatedBy": "d5a6179d-5f48-4161-ab6e-ee0bd4ce780b",
                    "updatedByFullName": "Maren Winnem",
                    "contacts": [{
                        "id": "755ba030-d183-4aff-bbdd-bd9ad542570f",
                        "title": "Graphic Designer",
                        "salutation": "Mr",
                        "fullName": "Mr Viktor Lemke",
                        "email": "lemke@abadmin.com",
                        "phone": "+44 699 123 45 67",
                        "mobile": "+44 699 123 45 67"
                    }, {
                        "id": "84db2e98-1a60-467e-b6e7-d49d8c12e5f8",
                        "title": "CEO",
                        "salutation": "Mrs",
                        "fullName": "Mrs Marleen Metzger",
                        "email": "metzger@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }, {
                        "id": "d3eb7062-34a4-4461-b0f5-f966515f5e9e",
                        "title": "Project Manager",
                        "salutation": "Mr",
                        "fullName": "Mr Bertram Mogens",
                        "email": "bmogens@abadmin.com",
                        "phone": "+44 172 682 69 80",
                        "mobile": "+44 172 682 69 80"
                    }],
                    "tasks": [{
                        "id": "7d9e8e0c-1ef1-4387-a7b3-08828b69daa1",
                        "projectId": "ad0677d5-9b32-4403-8e47-02958716aefb",
                        "status": 1,
                        "priority": 0,
                        "startDate": "2018-07-01T14:00:37",
                        "endDate": "2018-07-01T14:00:37",
                        "title": "Analyse pages",
                        "description": "Go through all pages and define sub tasks",
                        "hours": 10
                    }, {
                        "id": "8b6d778c-a75e-4fe3-b2b4-9d3bc248d9ba",
                        "projectId": "ad0677d5-9b32-4403-8e47-02958716aefb",
                        "status": 0,
                        "priority": 0,
                        "startDate": "2018-07-01T14:01:42",
                        "endDate": "2018-07-02T14:01:42",
                        "title": "Set up team",
                        "description": "Define project team.",
                        "hours": 2
                    }],
                    "id": "ad0677d5-9b32-4403-8e47-02958716aefb",
                    "name": "Website standard checkup",
                    "progress": 5,
                    "status": 0,
                    "priority": 0,
                    "startDate": "2018-08-08T07:58:28",
                    "endDate": "2018-07-01T07:58:28"
                }
            ];


            // async operation would be a call to a server side operation in a real world scenario.
            var getProject = function (id) {
                var deferred = $q.defer();
                try {
                    var result = null;
                    angular.forEach(projectdetails, function (detail) {
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

            return {
                actions: actions,
                status: projectStatus,
                priority: projectPriority,
                taskStatus: taskStatus,
                taskPriority: taskPriority,
                getProject: getProject
            };
        }]);
})();