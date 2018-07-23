/**
 * Controller for the DragPanels view.
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary
 */
(function () {
    "use strict";
    angular.module("abDragDropPanelsModule", [[]])
        .controller("DragDropPanelsController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {

                // Default
                $("#sortable").sortable().disableSelection({
                    revert: "invalid"
                });
                // Connected lists
                $("#sortable1, #sortable2").sortable({
                    revert: "invalid",
                    connectWith: ".connectedSortable"
                }).disableSelection();
                // Grid
                $("#sortablegrid").sortable().disableSelection();
                // Drop placeholder
                $("#sortableplaceholder").sortable({
                    revert: "invalid",
                    placeholder: "ui-state-highlight"
                }).disableSelection();
                // Drop placeholder animation
                $("#sortableplaceholder1").sortable({
                    revert: "invalid",
                    placeholder: "ui-state-highlight",
                    start: function (e, ui) {
                        $(ui.placeholder).hide(300);
                    },
                    change: function (e, ui) {
                        $(ui.placeholder).hide().show(300);
                    }
                }).disableSelection();

                if (config.debug) {
                    $notification.info("Drag and Drop panels loaded", "UIElements Panels", config.notificationDelay);
                }
            }]);
})();
