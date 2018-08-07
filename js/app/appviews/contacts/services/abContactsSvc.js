/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Service for contact lists
 */

(function () {
    "use strict";
    angular.module("ab.contacts.service", [
            ["/js/app/appviews/contacts/services/abContactsDataSvc.js"]
        ])
        .factory("abContactsSvc", ["$q", "abContactsDataSvc", function ($q, abContactsDataSvc) {
            var actions = {
                edit: 1,
                create: 2
            };

            var returnView = {
                versionone: 1,
                versiontwo: 2,
                versionthree: 3
            };
            // Helper enum for returning a http status code after a async call.
            var httpStatus = {
                OK: 200,
                NoContent: 204,
                BadRequest: 400,
                Forbidden: 403,
                InternalServerError: 500
            };
            //dummy datavar 
            var contacts = [];
            if (contacts.length === 0) {
                contacts = abContactsDataSvc.getAllContacts();
            }
            var getAllContacts = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    deferred.resolve(contacts);
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            var getContactById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = contacts.find(obj => obj.id === id);
                    if (result !== null && result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.resolve(httpStatus.NoContent);
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            var updateContact = function (model) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = contacts.find(obj => obj.id === model.id);
                    if (result !== null && result !== undefined) {
                        result = model;
                        deferred.resolve(result);
                    } else {
                        deferred.resolve();
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            var createContact = function (model) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = contacts.push(model);
                    if (result !== null && result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.resolve();
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            var fileUpload = function (model, id) {};

            var getContactsNoCompany = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = contacts.find(obj => obj.company === null);
                    if (result !== null && result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.resolve();
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var deleteContact = function (id) {
                var deferred = $q.defer();
                try {
                    var index = contacts.findIndex((obj => obj.id === id));
                    if (index >= 0) {
                        contacts.splice(index, 1);
                    }
                    abContactsDataSvc.deleteContact(id);
                    if (index > 0) {
                        deferred.resolve("OK");
                    } else {
                        deferred.resolve("OK");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            }

            return {
                deleteContact: deleteContact,
                returnView: returnView,
                actions: actions,
                fileUpload: fileUpload,
                updateContact: updateContact,
                createContact: createContact,
                getContactById: getContactById,
                getAllContacts: getAllContacts,
                getContactsNoCompany: getContactsNoCompany
            };
        }]);
})();