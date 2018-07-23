/**
 * Helper service for angularjs modal service
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Easy way of creating confirm,information and any type of modal windows.
 */

(function () {
    "use strict";
    angular.module("abModalDialogs", [])
        .factory("modalDialogs", ["$uibModal", function ($uibModal) {
            // All default values for the $uibModal service
            var modalDefaults = {
                animation: true,
                // appendTo (Type: angular.element
                // ariaDescribedBy (Type: string, my-modal-description)
                // ariaLabelledBy (Type: string, my-modal-title)
                backdrop: "static", // true - false or static
                // backdropClass (Type: string) - Additional CSS class(es) to be added to a modal backdrop template.
                // bindToController (Type: boolean, Default: false) - When used with controllerAs & set to true, it will bind the $scope properties onto the controller.
                // component (Type: string, Example: myComponent) - A string reference to the component to be rendered that is registered with Angular's compiler. If using a directive, the directive must have restrict: 'E' and a template or templateUrl set.
                // controller (Type: function|string|array, Example: MyModalController) - A controller for the modal instance, either a controller name as a string, or an inline controller function, optionally wrapped in array notation for dependency injection. Allows the controller-as syntax. Has a special $uibModalInstance injectable to access the modal instance.
                // controllerAs (Type: string, Example: ctrl) - An alternative to the controller-as syntax. Requires the controller option to be provided as well.
                keyboard: false,
                // openedClass (Type: string, Default: modal-open) - Class added to the body element when the modal is opened.
                // resolve (Type: Object) - Members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property in the router.
                // scope (Type: $scope) - The parent scope instance to be used for the modal's content. Defaults to $rootScope.
                size: "lg", //(Type: string, Example: lg) - Optional suffix of modal window class. The value used is appended to the modal- class, i.e. a value of sm gives modal-sm.
                // template (Type: string) - Inline template representing the modal's content.
                templateUrl: "/Scripts/app/common/templates/modal.html"
                // windowTemplateUrl (Type: string, Default: uib/template/modal/window.html) - A path to a template overriding modal's window template.
                // windowTopClass (Type: string) - CSS class(es) to be added to the top modal window.
            };
            // Default values for the custom options used in the modal templates.
            var modalOptions = {
                closeButtonText: "Cancel",
                okButtonText: "Save",
                okAndCloseButtonText: "Save & Close",
                headerText: "Dialog",
                contentUrl: "",
                hideClosebutton: false,
                hideOkButton: true,
                hideOkAndCloseButton: true
            };

            var showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) {
                    customModalDefaults = {};
                }

                var tempModalDefaults = {};
                var tempModalOptions = {};

                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
                angular.extend(tempModalOptions, modalOptions, customModalOptions);
                // If no controller is passed in, a default one is created.
                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = ["$scope", "$uibModalInstance", "modalOptions", function ($scope, $uibModalInstance, modalOptions) {
                        $scope.modalOptions = modalOptions;
                        $scope.ok = function () {
                            $uibModalInstance.close(true);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.close(false);
                        };
                        $scope.okAndClose = function (result) {
                            $uibModalInstance.close(result);
                        };
                    }];
                }

                tempModalDefaults.resolve = {
                    modalOptions: function () {
                        return tempModalOptions;
                    }
                };
                return $uibModal.open(tempModalDefaults).result;
            };


            var openDialog = function (customModalDefaults, customModalOptions) {
                var tempModalOptions = {};
                angular.extend(tempModalOptions, modalOptions, customModalOptions);
                return showModal(customModalDefaults, tempModalOptions);
            };

            // Simple confirm dialog
            var confirmInstanceController = ["$scope", "$uibModalInstance", "modalOptions", function ($scope, $uibModalInstance, modalOptions) {
                $scope.modalOptions = modalOptions;
                $scope.ok = function () {
                    $uibModalInstance.close(true);
                };

                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
            }];

            var openConfirmDialog = function (message, title) {
                var confirmModalDefaults = {
                    templateUrl: "Scripts/app/common/templates/confirm-dialog.html",
                    size: "",
                    controller: confirmInstanceController
                };

                var confirmModalOptions = {
                    headerText: title,
                    actionButtonText: "Yes",
                    closeButtonText: "No",
                    messageText: message
                };

                return openDialog(confirmModalDefaults, confirmModalOptions);
            };

            // Pure information dialog where it is possible to inject a html template and use the model to populate values.
            var infoInstanceController = ["$scope", "$uibModalInstance", "modalOptions", function ($scope, $uibModalInstance, modalOptions) {
                $scope.modalOptions = modalOptions;
                $scope.model = modalOptions.model;
                $scope.close = function () {
                    $uibModalInstance.close(true);
                };
            }];

            // main function for opening a modal.
            var openInfoDialog = function (contentUrl, title, model, size) {
                console.log("contentUrl");
                console.log(contentUrl);
                console.log("model");
                console.log(model);

                var infoModalDefaults = {
                    size: size ? size : "lg",
                    controller: infoInstanceController
                };

                var infoModalOptions = {
                    closeButtonText: "Close",
                    actionAndClodeButtonText: "",
                    hideOkButton: true,
                    hideOkAndCloseButton: true,
                    contentUrl: contentUrl,
                    model: model
                };
                return openDialog(infoModalDefaults, infoModalOptions);
            };

            return {
                openDialog: openDialog,
                openConfirmDialog: openConfirmDialog,
                openInfoDialog: openInfoDialog
            };
        }]);
})();