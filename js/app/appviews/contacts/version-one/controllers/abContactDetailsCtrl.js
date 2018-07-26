/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Displaying, editing and deleting contact details.
 */
(function () {
    "use strict";
    angular.module("abContactDetailsModule", [
            []
        ])
        .controller("ContactDetailsController", ["$scope", "$stateParams", "$notification", "abContactsSvc", "config", "$q", "abHelpersSvc", "$state",
            function ($scope, $stateParams, $notification, abContactsSvc, config, $q, abHelpersSvc, $state) {
                if (config.debug) {
                    console.info("$stateParams");
                    console.log($stateParams);
                }

                var returnToView = function () {
                    switch ($stateParams.return) {
                        case "1":
                            {
                                $state.go("contactsv1");
                                break;
                            }
                        case "2":
                            {
                                $state.go("contactsv2");
                                break;
                            }
                        case "3":
                            {
                                $state.go("contactsv3");
                                break;
                            }
                    }
                }

                if ($stateParams.id !== 0) {
                    abContactsSvc.getContactById($stateParams.id).then(function (data) {
                        if (config.debug) {
                            console.log("Getting contact details");
                            console.log(data);
                        }
                        if (data === undefined) {
                            $notification.warning("Not able to find contact", "AppView Contact Details", config.notificationDelay);
                            $scope.guid = "";
                        } else {
                            $scope.contact = data;
                            $scope.guid = data.id;
                        }
                    }).catch(function (error) {
                        $notification.error(error, "AppView Contact Details", config.notificationDelay);
                    });
                } else {
                    $scope.contact.id = abHelpersSvc.getNewGuid();
                    $scope.guid = $scope.contact.id;
                }
                abHelpersSvc.getCountries().then(function (data) {
                    $scope.countries = data;
                    if (config.debug) {
                        $notification.info("Country list loaded", "AppView Contact Details", config.notificationDelay);
                    }
                }).catch(function (error) {
                    $notification.error(error, "AppView Contact Details", config.notificationDelay);
                });

                $scope.contactList = function () {
                    returnToView();
                };

                $scope.saveContact = function (form) {
                    if (!form.$valid) {
                        return;
                    }

                    // Creating or updating contact
                    if ($scope.guid !== "") {
                        abContactsSvc.createContact($scope.contact)
                            .then(function () {
                                $notification.success("Contact created", "Contact", config.notificationDelay);
                                $state.go("contactsv1");
                            }).catch(function (message) {
                                $notification.error("Contact details create failed: " + message, "Contact", config.notificationDelay);
                            });
                    } else {
                        abContactsSvc.updateContact($scope.contact).then(function () {
                            $notification.success("Contact details updated", "Contact", config.notificationDelay);
                            $state.go("contactsv1");
                        }).catch(function (message) {
                            $notification.error("Contact details update failed: " + message, "Contact", config.notificationDelay);
                        });

                    }
                };

                $scope.deleteContact = function () {
                    abContactsSvc.deleteContact($scope.contact.id).then(function () {
                        $notification.success("Contact details delete", "Contact", config.notificationDelay);
                        returnToView();
                    }).catch(function (message) {
                        $notification.error("Contact details delete failed: " + message, "Contact", config.notificationDelay);
                    });
                };

                $scope.cancelEdit = function () {
                    returnToView();
                };

                $scope.updateAvatar = function () {
                    $("#avatarInput").click();
                };

                // Hooking into the file input event so it is possible to preview the avatar image
                $("#avatarInput").change(function () {
                    if (event.currentTarget.files.length === 1) {
                        var file = event.currentTarget.files[0];
                        $scope.avatar = file;
                        // Restricting avatar size to 1MB.
                        if (file.size > 1000000) {
                            $notification.warning("Image is to big. Max size: 1MB", "Avatar upload", config.notificationDelay);
                            return;
                        }

                        $scope.isNewAvatar = true;
                        var reader = new FileReader();
                        var imgList = $(".contact-avatar");
                        reader.onloadend = function () {
                            imgList[0].src = reader.result;
                        }
                        reader.readAsDataURL(file);
                    }
                });

                if (config.debug) {
                    $notification.info("Contact details loaded", "Contact", config.notificationDelay);
                }
            }
        ]);
})();