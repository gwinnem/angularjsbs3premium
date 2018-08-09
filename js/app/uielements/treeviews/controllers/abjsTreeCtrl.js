/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Demoes for jsTree
 */
(function () {
    "use strict";
    angular.module("jsTreeModule", [
            []
        ])
        .controller("jsTreeController", ["$scope", "$notification", "config",
            function ($scope, $notification, config) {
                // init Html tree
                $("#treeview_html").jstree();

                // Json tree
                var jsonData = [{
                    "id": "1",
                    "name": "Electronics",
                    "text": "Electronics",
                    "parent_id": "0",
                    "children": [{
                            "id": "2",
                            "name": "Mobile",
                            "text": "Mobile",
                            "parent_id": "1",
                            "children": [{
                                    "id": "7",
                                    "name": "Samsung",
                                    "text": "Samsung",
                                    "parent_id": "2"
                                },
                                {
                                    "id": "8",
                                    "name": "Apple",
                                    "text": "Apple",
                                    "parent_id": "2"
                                }
                            ]
                        },
                        {
                            "id": "3",
                            "name": "Laptop",
                            "text": "Laptop",
                            "parent_id": "1",
                            "children": [{
                                    "id": "4",
                                    "name": "Keyboard",
                                    "text": "Keyboard",
                                    "parent_id": "3"
                                },
                                {
                                    "id": "5",
                                    "name": "Computer Peripherals",
                                    "text": "Computer Peripherals",
                                    "parent_id": "3",
                                    "children": [{
                                            "id": "6",
                                            "name": "Printers",
                                            "text": "Printers",
                                            "parent_id": "5"
                                        },
                                        {
                                            "id": "10",
                                            "name": "Monitors",
                                            "text": "Monitors",
                                            "parent_id": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "11",
                                    "name": "Dell",
                                    "text": "Dell",
                                    "parent_id": "3"
                                }
                            ]
                        }
                    ]

                }];

                $("#treeview_json").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': true // multiselection allowed
                    }
                });

                $("#treeview_json_multiselect_off").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': false // multiselection off
                    }
                });

                $("#treeview_json_multiselect_off_contextmenu").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': false, // multiselection off
                        'check_callback': true // so that operations work
                    },
                    'plugins': ["contextmenu"]
                });

                $("#treeview_json_multiselect_off_contextmenu_dnd").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': false, // multiselection off
                        'check_callback': true // so that operations work
                    },
                    'plugins': ["contextmenu", "dnd"]
                });

                $("#treeview_json_check").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': false, // multiselection off
                        'check_callback': true // so that operations work
                    },
                    'plugins': ["contextmenu", "dnd", "checkbox"]
                });

                $("#treeview_json_search").jstree({
                    'core': {
                        'data': jsonData,
                        'multiple': false, // multiselection off
                        'check_callback': true // so that operations work
                    },
                    'plugins': ["contextmenu", "dnd", "checkbox", "search"]
                });

                $("#search").submit(function (event) {
                    event.preventDefault();
                    $("#treeview_json_search").jstree(true).search($("#search_text").val());
                });

                if (config.debug) {
                    $notification.info("Treeviews loaded", "UIElements jsTree", config.notificationDelay);
                }
            }
        ]);
})();