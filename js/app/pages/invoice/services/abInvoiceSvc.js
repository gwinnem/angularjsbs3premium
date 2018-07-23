/**
 * abInvoiceSvc.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Factory service Invoice page.
 */

(function () {
    "use strict";
    angular.module("abInvoiceServiceModule", [[]])
        .factory("abInvoiceSvc", [function () {

            // Company details
            var company = {
                name: "ABAdmin AG.",
                address: "Hochmuthgasse 9/5/26",
                postal: "1220 Vienna",
                country: "AT Austria",
                phone: "+43 1 128 66 80",
                email: "invoice@abadmin.com",
                iban: "AT 483200000012345864",
                tax: "9.3"
            };

            // Client details
            var client = {
                id: 100,
                billingcurrency: "&#8364;",
                name: "Oslo University Medical Center",
                address: "Nils Hamborgsvei 3",
                postal: "1400 Oslo",
                country: "NO Norway",
                phone: "+47 22 33 68 50",
                email: "office@unimed.no"
            };

            // Invoice details
            var invoice = {
                no: "INV-000567F7-00",
                orderid: "39558",
                duedate: "31/03/2018",
                date: "31/01/2018",
                shipping: 155.79,
                items: [
                { id: "LCD123", qty: "12", price: "123.45", product: "Dell 17", descr: "Dell 17 inch lcd display" },
                { id: "PC247", qty: "6", price: "200.00", product: "Dell Power Pc 24", descr: "24MB ram, 256MB Hd" },
                { id: "NO488", qty: "2", price: "157.00", product: "Dell Notebook 24", descr: "24MB ram, 256MB Hd, 17Inch lcd  Display, German Keyboard" }
                ]
            }

            return {
                company: company,
                client: client,
                invoice: invoice
            }
        }]);
})();