﻿/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Handling company list, details etc.
 */

(function () {
    "use strict";
    angular.module("abCompanyServices", [
            ["js/plugins/faker.js/faker.min.js"]
        ])
        .factory("abCompaniesSvc", ["$q", function ($q) {

           
            var getCompany = function () {
                return {
                    id: faker.random.uuid(),
                    status: faker.random.boolean(),
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    email: faker.internet.exampleEmail(),
                    address: faker.address.streetAddress(),
                    country: faker.address.country(),
                    avatar: faker.internet.avatar(),
                    contacts : []
                };
            };
            var actions = {
                create: 0,
                display: 1,
                edit: 2
            };

            var companyStatus = {
                inactive: false,
                active: true
            };
            var companies = [];
            for (var index = 0; index <= 50; index++) {
                companies.push(getCompany());
            }
            var getAll = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    deferred.resolve(companies);
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var getDetails = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = companies.find(obj => obj.id === id);
                    if (result !== null && result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.resolve("ERROR");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            return {
                companyStatus: companyStatus,
                actions: actions,
                getAll: getAll,
                getDetails: getDetails
            };
        }]);
})();