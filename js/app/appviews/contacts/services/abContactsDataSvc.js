/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Generating contact details.
 */

(function () {
    "use strict";
    angular.module("abContactsDataService", [
            ["js/plugins/faker.js/faker.min.js", ]
        ])
        .factory("abContactsDataSvc", [function () {
            //faker.helpers.userCard();
            var contacts = [];
            for (var index = 0; index <= 50; index++) {

                var tmp = {
                    id: faker.random.uuid(),
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    jobTitle: faker.name.jobTitle(),
                    jobDescriptor: faker.name.jobDescriptor(),
                    jobArea: faker.name.jobArea(),
                    jobType: faker.name.jobType(),
                    prefix: faker.name.prefix(),
                    suffix: faker.name.suffix(),
                    phone: faker.phone.phoneNumber(),
                    mobile: faker.phone.phoneNumber(),
                    email: faker.internet.email(),
                    avatar: faker.internet.avatar(),
                    company: faker.company.companyName(),
                    address: {
                        zipCode: faker.address.zipCode(),
                        city: faker.address.city(),
                        streetName: faker.address.streetName(),
                        streetAddress: faker.address.streetAddress(),
                        secondaryAddress: faker.address.secondaryAddress(),
                        county: faker.address.county(),
                        country: faker.address.country(),
                        countryCode: faker.address.countryCode(),
                        state: faker.address.state(),
                        stateAbbr: faker.address.stateAbbr(),
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude()
                    }
                };
                contacts.push(
                    tmp
                );
            }
            var getAllContacts = function () {
                return contacts;
            };
            var deleteContact = function (id) {
                var index = contacts.findIndex((obj => obj.id === id));
                if (index >= 0) {
                    contacts.splice(index, 1);
                }
            }
            return {
                getAllContacts: getAllContacts,
                deleteContact: deleteContact
            };
        }]);
})();