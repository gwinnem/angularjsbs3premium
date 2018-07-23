/**
 * abInvoiceCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Simple invoice controller for editing and saving invoices
 */
(function () {
    "use strict";
    angular.module("abInvoiceModule", [
            []
        ])
        .controller("InvoiceController", ["$scope", "$notification", "abInvoiceSvc", "config",
            function ($scope, $notification, abInvoiceSvc, config) {
                $scope.company = abInvoiceSvc.company;
                $scope.client = abInvoiceSvc.client;
                $scope.invoice = abInvoiceSvc.invoice;

                $scope.getTotal = function (item) {
                    return item.qty * item.price;
                }
                $scope.getSubTotal = function () {
                    var total = 0;
                    angular.forEach($scope.invoice.items, function (item) {
                        total = total + (item.qty * item.price);
                    });
                    return total;
                }

                $scope.calculateTax = function () {
                    var subTotal = $scope.getSubTotal();
                    return (subTotal * $scope.company.tax) / 100;
                }

                $scope.getTotalSum = function () {
                    return $scope.getSubTotal() + $scope.calculateTax() + $scope.invoice.shipping;
                }

                if (config.debug) {
                    $notification.info("Invoice loaded", "AB Admin", config.notificationDelay);
                }
            }
        ]);
})();