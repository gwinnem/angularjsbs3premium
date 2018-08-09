/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary
 */
(function () {
    "use strict";
    angular.module("abResizePanelsModule", [
            []
        ])
        .controller("ResizeController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                // Default functionality
                $("#resizable").resizable();
                // Animation
                $("#resizableanim").resizable({
                    animate: true
                });
                // Restrain Area
                $("#resizableconstrain").resizable({
                    containment: "#container"
                });
                // Helper
                $("#resizablehelper").resizable({
                    helper: "ui-resizable-helper"
                });
                // Resize max min
                $("#resizablemaxmin").resizable({
                    maxHeight: 280,
                    minHeight: 100,
                    maxWidth: 350,
                    minWidth: 200
                });
                // Aspect ratio
                $("#resizableaspect").resizable({
                    aspectRatio: 16 / 9
                });
                // Snap to grid
                $("#resizablesnap").resizable({
                    grid: 50
                });
                // Textarea
                $("#resizabletext").resizable({
                    handles: "se"
                });
                if (config.debug) {
                    $notification.success("Panels loaded", "Resize Panels", config.notificationDelay);
                }
            }
        ]);
})();