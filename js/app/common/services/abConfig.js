/**
 * @author Geirr Winnem
 * @version 0.2.0
 * @summary Configuration factory for ABAdmin.
 */
(function() {
  "use strict";

  angular.module("ab.common.config", []).factory("config", function() {
    // If true, debug data will be sent to console log
    var debug = true;
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
