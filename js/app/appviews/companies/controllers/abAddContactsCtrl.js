/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Adding contacts to a company.
 */
(function () {
  "use strict";
  angular.module("abcompanydetailsaddcontacts", [])
    .controller("AddContactsController", ["$scope", "$notification", "config", "$uibModalInstance", "modalOptions",
      function ($scope, $notification, config, $uibModalInstance, modalOptions) {
        if (config.debug) {
          console.log("AddContactsController loaded");
          console.log("Contacts");
          console.log(modalOptions.contacts);
        }
        $scope.contacts = modalOptions.contacts;
        $scope.ok = function () {
          // var contacts = [];
          // angular.forEach(modalOptions.contacts, function (item) {
          //   if (item.checked) {
          //     contacts.push(item.id);
          //   }
          // });
          $uibModalInstance.close(contacts);

          // var model = {
          //   id: $scope.company.id
          //   //contactsId: contacts.join()
          // };
          // if (contacts.length > 0) {
          //   abCompaniesSvc
          //     .addCompanyContacts(model)
          //     .then(function (result) {
          //       if (config.debug) {
          //         console.log("addCompanyContacts: " + result);
          //       }
          //     })
          //     .catch(function (error) {
          //       $notification.error(
          //         message,
          //         "addCompanyContacts error",
          //         config.notificationDelay
          //       );
          //     });
          // }
          //$uibModalInstance.close(true, $scope.company);
        };

        $scope.cancel = function () {
          $uibModalInstance.close(false);
        };

        if (config.debug) {
          $notification.success("AddContacts loaded", "Company details", config.notificationDelay);
        }
      }
    ]);
})();
