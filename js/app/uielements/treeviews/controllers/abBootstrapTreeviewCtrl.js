/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Converting nested ul li to a treeview
 */
(function () {
    "use strict";
    angular.module("BootstrapTreeviewModule", [])
        .controller("BootstrapTreeviewController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                $.fn.extend({
                    treeview: function (o) {

                        var openedClass = 'glyphicon-minus-sign';
                        var closedClass = 'glyphicon-plus-sign';

                        if (typeof o != 'undefined') {
                            if (typeof o.openedClass != 'undefined') {
                                openedClass = o.openedClass;
                            }
                            if (typeof o.closedClass != 'undefined') {
                                closedClass = o.closedClass;
                            }
                        };

                        //initialize each of the top levels
                        var tree = $(this);
                        tree.addClass("bootstraptree");
                        tree.find('li').has("ul").each(function () {
                            var branch = $(this); //li with children ul
                            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                            branch.addClass('branch');
                            branch.on('click', function (e) {
                                if (this === e.target) {
                                    var icon = $(this).children('i:first');
                                    icon.toggleClass(openedClass + " " + closedClass);
                                    $(this).children().children().toggle();
                                }
                            })
                            branch.children().children().toggle();
                        });
                        //fire event from the dynamically added icon
                        tree.find('.branch .indicator').each(function () {
                            $(this).on('click', function () {
                                $(this).closest('li').click();
                            });
                        });
                        //fire event to open branch if the li contains an anchor instead of text
                        tree.find('.branch>a').each(function () {
                            $(this).on('click', function (e) {
                                $(this).closest('li').click();
                                e.preventDefault();
                            });
                        });
                    }
                });

                //Initialization of treeviews
                $('#tree1').treeview();
                $('#tree2').treeview();
                $('#tree3').treeview();
                if (config.debug) {
                    $notification.success("Treeview loaded", "UI Elements Bootstrap", config.notificationDelay);
                }
            }
        ]);
})();