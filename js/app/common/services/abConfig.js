/**
 * Aurora Borealis Admin Template app
 * @author Geirr Winnem
 * @version 0.2.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Configuration factory for ABAdmin.
 */
(function() {
  "use strict";

  angular.module("abConfig", []).factory("config", function() {
    // If true, debug data will be sent to console log
    var debug = false;
    // If true all route state changes will be sent to console log
    var debugState = false;
    // Delay used in the notification service
    var notificationDelay = 3000;

    // Hide or show page title
    var showPageTitle = true;
    // Hide or show breadcrumbs
    var showBreadCrumbs = true;

    // Defining if we are using local data for the Outlook functionality.
    var outLookLocal = true;
    var baseUrl = "http://aurora.local/";

    return {
      baseUrl: baseUrl,
      // ReSharper disable ExpressionIsAlwaysConst
      outLookLocal: outLookLocal,
      debug: debug,
      debugState: debugState,
      notificationDelay: notificationDelay,
      showPageTitle: showPageTitle,
      showBreadCrumbs: showBreadCrumbs
      // ReSharper restore ExpressionIsAlwaysConst
    };
  });
})();
