/**
 * Aurora Borealis Admin Template app
 * @author Geirr Winnem
 * @version 0.2.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Configuration factory for ABAdmin.
 */
(function () {
    "use strict";

    angular.module("abConfig", [])
        .factory("config", function () {

            // Defining if we are showing page title and breadcrumbs
            var showPageTitle = true;
            var showBreadCrumbs = true;
            var notificationDelay = 3000;
            // base url is used in the service abDataSvc.js
            var baseUrl = "http://aurora.local/";

            return {
                baseUrl: baseUrl,
                notificationDelay: notificationDelay,
                showPageTitle: showPageTitle,
                showBreadCrumbs: showBreadCrumbs
            };
        });
})();