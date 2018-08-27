/**
 * Aurora Borealis Admin Template.
 * @author Geirr Winnem
 * @summary Angular 1.x admin dashboard template.
 */

var abApp = angular.module("aurora", [
    "ngSanitize",
    "oc.lazyLoad",
    "ui.router",
    "ui.bootstrap",
    "ui-notification",
    "ngTagsInput",
    "ui.select",
    // ABAdmin modules
    "ab.common.config",
    "ab.common.consolelog",
    "ab.common.dataservice",
    "ab.common.ui.simplebreadcrumbs",
    "ab.common.ui.pageTitle",
    "ab.common.ui.nouislider",
    "abSlimScroll",
    "abWhenScrollEnds",
    "abInfobox",
    "abSmallBox",
    "abIconBox",
    "abHelpers",
    "abToggleSwitch",
    "abStatusLabel",
    "abPriorityLabel",
    "abModalDialogs",
    "abIcheck",
    "abNumbersOnly",
    "abTextAreaAutoresize",
    "abFitHeight",
    "abTodoList",
    "abBoxTools"
]);


abApp.config([
    "$stateProvider",
    "$httpProvider",
    "$locationProvider",
    "$urlRouterProvider",
    "$provide",
    "$compileProvider",
    "$ocLazyLoadProvider",
    "$qProvider",
    "$urlMatcherFactoryProvider",
    function ($stateProvider,
        $httpProvider,
        $locationProvider,
        $urlRouterProvider,
        $provide,
        $compileProvider,
        $ocLazyLoadProvider,
        $qProvider,
        $urlMatcherFactoryProvider) {

        //$qProvider.errorOnUnhandledRejections(true);
        $urlMatcherFactoryProvider.strictMode(true);

        // Turning on / off debug information
        $compileProvider.debugInfoEnabled(true);

        // Set to true if you want to see what and when is dynamically loaded. https://github.com/ocombe/ocLazyLoad
        $ocLazyLoadProvider.config({
            debug: false
        });

        //Loading states
        // https://github.com/angular-ui/ui-router/wiki

        $stateProvider
            .state("home", {
                url: "/welcome",
                templateUrl: "pages/welcome.html",
                pageTitle: "ABAdmin AngularJs Premium Version",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Welcome"
                }]
            })

            // Dashboards
            .state("dashboardone", {
                url: "/dashboard/one",
                templateUrl: "pages/dashboards/dashboardone.html",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Dahboards"
                }, {
                    name: "One"
                }],
                pageTitle: "Dashboard 1",
                controller: "DashboardOneController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/Chart.js/Chart.js",
                                    "/js/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css",
                                    "/js/plugins/bootstrap-progressbar/bootstrap-progressbar.min.js",
                                    "/js/plugins/jquery.sparkline/dist/jquery-sparkline.js",
                                    "/js/app/dashboards/controllers/dashboardOneController.js"
                                ]
                            });
                        }
                    ]
                }
            })
            .state("dashboardtwo", {
                url: "/dashboard/two",
                templateUrl: "pages/dashboards/dashboardtwo.html",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Dashboards"
                }, {
                    name: "Two"
                }],
                pageTitle: "Dashboard 2",
                controller: "DashboardTwoController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/jqvmap/dist/jquery.vmap.min.js",
                                    "/js/plugins/jqvmap/dist/maps/jquery.vmap.world.js",
                                    "/js/plugins/jqvmap/dist/jqvmap.min.css",
                                    "css/flags-of-the-world/css/flags.css",
                                    "/js/app/dashboards/controllers/abDashboardTwoController.js"
                                ]
                            });
                        }
                    ]
                }
            })
            .state("dashboarthree", {
                url: "/dashboard/three",
                templateUrl: "pages/dashboards/dashboardthree.html",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Dahboards"
                }, {
                    name: "Three"
                }],
                pageTitle: "Dashboard 3",
                controller: "DashboardThreeController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/Chart.js/Chart.js",
                                    "/js/app/dashboards/controllers/dashboardThreeController.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Widgets
            .state("widgets", {
                url: "/widgets",
                templateUrl: "/pages/widgets.html",
                pageTitle: "Widgets",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Widgets"
                }]
            })

            // Outlook version 1
            .state("outlookone", {
                url: "/outlook/version-one/inbox",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }],
                views: {
                    '': {
                        templateUrl: "/pages//outlook/version-one/outlook.html",
                        controller: "abInboxCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/directives/abFolders.js",
                                            "/js/app/outlook/version-one/controllers/abInboxCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    },
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/inboxView.html"
                    }
                }

            })
            .state("outlookone.sentview", {
                url: "/sentEmails",
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Sent emails"
                }],
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/sentView.html",
                        controller: "abSentCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abSentCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                }
            })
            .state("outlookone.draftsview", {
                url: "/drafts",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/draftsView.html",
                        controller: "abDraftsCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abDraftsCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Drafts"
                }]

            })
            .state("outlookone.spamview", {
                url: "/spam",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/spamView.html",
                        controller: "abSpamCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abSpamCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Spam"
                }]

            })
            .state("outlookone.trashview", {
                url: "/trash",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/trashView.html",
                        controller: "abTrashCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abTrashCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Trash"
                }]

            })
            .state("outlookone.archiveview", {
                url: "/archive",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/archiveView.html",
                        controller: "abArchiveCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abArchiveCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Archive"
                }]

            })
            .state("outlookone.readmail", {
                url: "/readEmail/{id}/{view}",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/read-mail.html",
                        controller: "abReadEmailCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abReadEmailCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Read Email"
                }]

            })
            .state("outlookone.compose", {
                url: "/composeEmail/{id}/{view}",
                views: {
                    "folderDetails@outlookone": {
                        templateUrl: "/pages/outlook/version-one/compose-mail.html",
                        controller: "abComposeCtrl",
                        resolve: {
                            ctrl: [
                                "$ocLazyLoad",
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: ["bower_components/summernote/dist/summernote.css",
                                            "bower_components/summernote/dist/summernote.min.js",
                                            "bower_components/angular-summernote/dist/angular-summernote.min.js",
                                            "/js/app/outlook/version-one/services/abMailSvc.js",
                                            "/js/app/outlook/version-one/controllers/abComposeCtrl.js"
                                        ]
                                    });
                                }
                            ]
                        }
                    }

                },
                parent: "outlookone",
                pageTitle: "Inbox version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Outlook"
                }, {
                    name: "Inbox1"
                }, {
                    name: "Compose Email"
                }]

            })

            //Charts

            //Chart.js Bar charts
            .state("chartjsbarcharts", {
                url: "/chartjs/barcharts",
                templateUrl: "pages/charts/chartjs/barcharts.html",
                controller: "ChartJsBarChartsController",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "ChartJs"
                }, {
                    name: "Barcharts"
                }],
                pageTitle: "Chart.js Bar Charts",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/Chart.js/Chart.bundle.min.js",
                                "/js/app/charts/chartjs/services/abBarChartSvc.js",
                                "/js/app/charts/chartjs/controllers/abBarChartCtrl.js"
                            ]);
                        }
                    ]
                }
            })
            // Chart.js Line charts
            .state("chartjslinecharts", {
                url: "/charts/chartjs/linecharts",
                templateUrl: "pages/charts/chartjs/linecharts.html",
                controller: "ChartJsLineChartsController",
                pageTitle: "Chart.js Line Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "ChartJs"
                }, {
                    name: "Linecharts"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/Chart.js/Chart.bundle.min.js",
                                "/js/plugins/Chart.js/samples/utils.js",
                                "/js/app/charts/chartjs/services/abBarChartSvc.js",
                                "/js/app/charts/chartjs/controllers/abLineChartCtrl.js"
                            ]);
                        }
                    ]
                }
            })
            // Chart.js Area charts
            .state("chartjsareacharts", {
                url: "/charts/chartjs/areacharts",
                templateUrl: "/pages/charts/chartjs/areacharts.html",
                pageTitle: "Chart.js Area Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "ChartJs"
                }, {
                    name: "Areacharts"
                }],
                controller: "ChartJsAreaChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/Chart.js/Chart.bundle.min.js",
                                    "/js/plugins/Chart.js/samples/utils.js",
                                    "/js/app/charts/chartjs/controllers/abAreaChartCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Chart.js Other charts
            .state("chartjsothercharts", {
                url: "/charts/chartjs/othercharts",
                templateUrl: "pages/charts/chartjs/othercharts.html",
                pageTitle: "Chart.js Other Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "ChartJs"
                }, {
                    name: "Othercharts"
                }],
                controller: "ChartJsOtherChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/Chart.js/Chart.bundle.min.js",
                                "/js/app/charts/chartjs/abChartJsCommon.js",
                                "/js/app/charts/chartjs/controllers/abOtherChartCtrl.js"
                            ]);
                        }
                    ]
                }
            })
            // Chart.js Financial plugin
            .state("chartjsfinancial", {
                url: "/charts/chartjs/financialcharts",
                templateUrl: "pages/charts/chartjs/financialcharts.html",
                pageTitle: "Chart.js Financial Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "ChartJs"
                }, {
                    name: "Financialharts"
                }],
                controller: "ChartJsFinancialChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/Chart.js/Chart.bundle.min.js",
                                "/js/plugins/Chart.js/plugins/chartjs-chart-financial/src/chart-financial.min.js",
                                "/js/app/charts/chartjs/controllers/abFinancialChartCtrl.js"
                            ]);
                        }
                    ]
                }
            })

            // Flot
            .state("flotindex", {
                url: "/charts/flot/main",
                templateUrl: "pages/charts/flot/index.html",
                pageTitle: "Introduction to the Flot charting library",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "flot"
                }, {
                    name: "main"
                }]
            })
            .state("flotbasicoptions", {
                url: "/charts/flot/basic/options",
                templateUrl: "pages/charts/flot/basicoptions.html",
                pageTitle: "Flot Basics",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "flot"
                }, {
                    name: "options"
                }],
                controller: "FlotBasicChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/flot/jquery.flot.min.js",
                                    "/js/plugins/flot/jquery.flot.resize.min.js",
                                    "/js/app/charts/flot/services/abFlotSvc.js",
                                    "/js/app/charts/flot/controllers/abFlotBasicCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            .state("flotbarcharts", {
                url: "/charts/flot/barcharts",
                templateUrl: "pages/charts/flot/barcharts.html",
                pageTitle: "Flot Bar Charts",
                controller: "FlotBarChartsController",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "flot"
                }, {
                    name: "barcharts"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/flot/jquery.flot.min.js",
                                "/js/app/charts/flot/services/abFlotSvc.js",
                                "/js/app/charts/flot/controllers/abFlotBarChartsCtrl.js"
                            ]);
                        }
                    ]
                }
            })
            .state("flotaxes", {
                url: "/charts/flot/axes",
                templateUrl: "pages/charts/flot/axescharts.html",
                pageTitle: "Flot Chart Axes",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "flot"
                }, {
                    name: "axes"
                }],
                controller: "FlotAxesController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["/js/plugins/flot/jquery.flot.min.js",
                                "/js/plugins/flot/jquery.flot.resize.min.js",
                                "/js/plugins/flot/jquery.flot.time.min.js",
                                "/js/app/charts/flot/services/abFlotSvc.js",
                                "/js/app/charts/flot/controllers/abFlotAxesCtrl.js"
                            ]);
                        }
                    ]
                }
            })


            // Morris
            // Line Charts
            .state("morrislinecharts", {
                url: "/charts/morris/linecharts",
                templateUrl: "pages/charts/morris/linecharts.html",
                pageTitle: "Morris Line Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Morris"
                }, {
                    name: "Linecharts"
                }],
                controller: "MorrisLineChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/raphael/raphael.min.js",
                                    "/js/plugins/morris.js/morris.min.js",
                                    "/js/plugins/morris.js/morris.css",
                                    "/js/app/charts/morris/controllers/abMorrisLineChartCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Bar Charts
            .state("morrisbarcharts", {
                url: "/charts/morris/barcharts",
                templateUrl: "pages/charts/morris/barcharts.html",
                pageTitle: "Morris Bar Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Morris"
                }, {
                    name: "Barcharts"
                }],
                controller: "MorrisBarChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/raphael/raphael.min.js",
                                    "/js/plugins/morris.js/morris.min.js",
                                    "/js/plugins/morris.js/morris.css",
                                    "/js/app/charts/morris/controllers/abMorrisBarChartCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Area Charts
            .state("morrisareacharts", {
                url: "/charts/morris/areacharts",
                templateUrl: "pages/charts/morris/areacharts.html",
                pageTitle: "Morris Area Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Morris"
                }, {
                    name: "Areacharts"
                }],
                controller: "MorrisAreaChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/raphael/raphael.min.js",
                                    "/js/plugins/morris.js/morris.min.js",
                                    "/js/plugins/morris.js/morris.css",
                                    "/js/app/charts/morris/controllers/abMorrisAreaChartCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Donut Charts
            .state("morrisdonutcharts", {
                url: "/charts/morris/donutcharts",
                templateUrl: "pages/charts/morris/donutcharts.html",
                pageTitle: "Morris Donut Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Morris"
                }, {
                    name: "Donutcharts"
                }],
                controller: "MorrisDonutChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/raphael/raphael.min.js",
                                    "/js/plugins/morris.js/morris.min.js",
                                    "/js/plugins/morris.js/morris.css",
                                    "/js/app/charts/morris/controllers/abMorrisDonutChartCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })



            // Peity charts
            .state("peitycharts", {
                url: "/charts/peity",
                templateUrl: "pages/charts/peity/peity.html",
                pageTitle: "Peity Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Peity Charts"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/peity/jquery.peity.min.js"]
                            });
                        }
                    ]
                }
            })



            //Rickshaw charts
            .state("rickshawcharts", {
                url: "/charts/richshaw",
                templateUrl: "pages/charts/rickshaw/charts.html",
                pageTitle: "Rickshaw Charts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Charts"
                }, {
                    name: "Richshaw Charts"
                }],
                controller: "RickshawChartsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/rickshaw/rickshaw.min.css",
                                    "/js/plugins/rickshaw/rickshaw.js",
                                    "/js/app/charts/rickshaw/controllers/abRickshawCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })



            // Forms
            .state("bootstrapform", {
                url: "/forms/bootstrap-forms",
                templateUrl: "pages/forms/bootstrapforms.html",
                pageTitle: "Bootstrap forms",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Bootstrap"
                }],
                controller: "BootstrapformController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/forms/bootstrapforms/controllers/abBootstrapFormCtrl.js");
                        }
                    ]
                }
            })


            // Bootstrap form elements
            .state("bootstrapformelement", {
                url: "/forms/elements/bootstrap",
                templateUrl: "pages/forms/bootstrapformelements.html",
                pageTitle: "Bootstrap form elements",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Bootstrap"
                }, {
                    name: "Elements"
                }],
                controller: "BootstrapformElementsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/forms/bootstrapformelements/controllers/abBootstrapFormElementsCtrl.js");
                        }
                    ]

                }
            })


            // Advanced form elements

            // Bootstrap Switch
            .state("bootstrapswitch", {
                url: "/forms/elements/advanced/bootstrapswitch",
                templateUrl: "pages/forms/bootstrapswitch.html",
                pageTitle: "Bootstrap Switch",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Bootstrap Switch"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/bootstrap-switch-3.3.4/dist/css/bootstrap3/bootstrap-switch.min.css",
                                "/js/plugins/bootstrap-switch-3.3.4/dist/js/bootstrap-switch.js"]
                            });
                        }
                    ]
                }
            })
            // Awesome Bootstrap Checkbox v1.0.0
            .state("awesomecheckbox", {
                url: "/forms/elements/advanced/awesomecheckboxes",
                templateUrl: "pages/forms/awesomecheckbox.html",
                pageTitle: "Awesome Bootstrap Checkbox v1.0.0",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Awesome Checkboxes"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/css/awesome-bootstrap-checkbox/abc.css"]
                            });
                        }
                    ]

                }
            })
            //Select2
            .state("select2", {
                url: "/forms/elements/advanced/select2",
                templateUrl: "pages/forms/select2.html",
                pageTitle: "Advanced form elements (select2)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Select2"
                }],
                controller: "Select2Controller",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/select2/dist/css/select2.min.css",
                                    "/js/plugins/select2/dist/js/select2.full.min.js",
                                    "/js/app/forms/select2/controllers/abSelect2Ctrl.js"
                                ]
                            });
                        }
                    ]

                }
            })

            // Chosen
            .state("chosen", {
                url: "/forms/elements/advanced/chosen",
                templateUrl: "pages/forms/chosen.html",
                pageTitle: "Advanced form elements (chosen)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Chosen"
                }],
                controller: "ChosenController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/chosen_v1.8.2/bootstrap-chosen.css",
                                    "/js/plugins/chosen_v1.8.2/chosen.jquery.js",
                                    "/js/app/forms/chosen/controllers/abChosenCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // roundslider
            .state("roundslider", {
                url: "/forms/elements/advanced/roundslider",
                templateUrl: "pages/forms/roundslider.html",
                pageTitle: "Advanced form elements (jQuery Round slider)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Round Slider"
                }],
                controller: "RoundSliderController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/roundSlider-1.3/src/roundslider.css",
                                    "/js/plugins/roundSlider-1.3/dist/roundslider.min.js",
                                    "/js/app/forms/roundslider/controllers/abRoundSliderCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // rangeslider
            .state("rangeslider", {
                url: "/forms/elements/advanced/rangeslider",
                templateUrl: "pages/forms/rangeslider.html",
                pageTitle: "Advanced form elements (ion rangeSlider)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "ion rangeSlider"
                }],
                controller: "RangeSliderController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/ionRangeSlider/css/demo.css",
                                    "/js/plugins/ionRangeSlider/css/ion.rangeSlider.css",
                                    "/js/plugins/ionRangeSlider/css/ion.rangeSlider.skinFlat.css",
                                    "/js/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js",
                                    "/js/app/forms/rangeslider/controllers/abRangeSliderCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // nouislider
            .state("nouislider", {
                url: "/forms/elements/advanced/nouislider",
                templateUrl: "pages/forms/nouislider.html",
                pageTitle: "Advanced form elements (noUISlider)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "noUISlider"
                }],
                controller: "UiSliderController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/forms/uislider/controllers/abUiSliderCtrl.js");
                        }
                    ]
                }
            })

            // input masks
            .state("inputmasks", {
                url: "/forms/elements/advanced/inputmasks",
                templateUrl: "pages/forms/inputmasks.html",
                pageTitle: "Advanced form elements (jasny inputmasks)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "jasny input masks"
                }],
                controller: "JasnyController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/jasny-bootstrap/css/jasny-bootstrap.min.css",
                                    "/js/plugins/jasny-bootstrap/js/jasny-bootstrap.min.js",
                                    "/js/app/forms/jasny/controllers/abJasnyCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // datetimepickers
            .state("datetimepickers", {
                url: "/forms/elements/advanced/datetimepickers",
                templateUrl: "pages/forms/datetimepickers.html",
                pageTitle: "Advanced form elements (Date Time pickers)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Date time pickers"
                }],
                controller: "DateTimePickerController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/bootstrap-daterangepicker/daterangepicker.css",
                                    "/js/plugins/bootstrap-daterangepicker/daterangepicker.js",
                                    "/js/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css",
                                    "/js/plugins/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
                                    "/js/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css",
                                    "/js/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js",
                                    "/js/app/forms/datetimepickers/controllers/abDateTimePickersCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // icheck
            .state("icheckbox", {
                url: "/forms/elements/advanced/icheck",
                templateUrl: "pages/forms/icheck.html",
                pageTitle: "iCheck - Checkbox & Radio Inputs",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "iCheck"
                }]
            })

            // jQuery knob
            .state("jqueryknob", {
                url: "/forms/elements/advanced/jqueryknob",
                templateUrl: "pages/forms/jqueryknob.html",
                pageTitle: "Advanced form elements (jQuery Knob)",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "jQuery Knob"
                }],
                controller: "JqueryKnobController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/jQuery-Knob/dist/jquery.knob.min.js",
                                    "/js/app/forms/jqueryknob/controllers/abJqueryKnobCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Dropzone
            .state("dropzone", {
                url: "/forms/upload/dropzone",
                templateUrl: "pages/forms/dropzone.html",
                pageTitle: "Dropzone dnd file upload",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "DropZone"
                }],
                //controller: "",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/dropzone/src/basic.css",
                                    "/js/plugins/dropzone/src/dropzone.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Autocomplete
            .state("autocomplete", {
                url: "/forms/typeahaed",
                templateUrl: "pages/forms/bootstrapautocomplete.html",
                pageTitle: "Twitter Bootstrap Typeahead",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Type Ahead"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/bootstrap-3-typeahead/bootstrap3-typeahead.min.js"]
                            });
                        }
                    ]
                }
            })

            //Form Editors
            .state("ckeditor", {
                url: "/form/editors/ckeditor",
                templateUrl: "pages/forms/editors/ckeditor.html",
                pageTitle: "CK Editor",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Editors"
                }, {
                    name: "CK Editor"
                }]
            })
            .state("bootstrapeditor", {
                url: "/form/editors/bootstrap",
                templateUrl: "pages/forms/editors/bootstrapwysiwyg.html",
                pageTitle: "Bootstrap Editor",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Editors"
                }, {
                    name: "Bootstrap WYSIHTML5"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
                                    "/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"
                                ]
                            });
                        }
                    ]
                }
            })
            .state("summernoteeditor", {
                url: "/form/editors/summernote",
                templateUrl: "pages/forms/editors/summernote.html",
                pageTitle: "Summernote WYSIWYG",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Forms"
                }, {
                    name: "Advanced Elements"
                }, {
                    name: "Editors"
                }, {
                    name: "SummerNote"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/summernote/summernote.css",
                                    "/js/plugins/summernote/summernote-bs3.css",
                                    "/js/plugins/summernote/summernote.min.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // App views
            .state("appviewsintroduction", {
                url: "/app/introduction",
                templateUrl: "/pages/appviews/introduction.html",
                pageTitle: "Application Views",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                },
                {
                    name: "Introduction"
                }
                ]
            })
            // Contact list v1
            .state("contactsv1", {
                url: "/app/contactsv1",
                templateUrl: "/pages/appviews/contacts/version-one/contactslist-1.html",
                pageTitle: "Contact List V1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Contact List V1"
                }],
                controller: "ContactsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/contacts/directives/abShowAvatar.js",
                                    "/js/app/appviews/contacts/version-one/controllers/abContactsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Contact list v2
            .state("contactsv2", {
                url: "/app/contactsv2",
                templateUrl: "/pages/appviews/contacts/version-two/contactslist-2.html",
                pageTitle: "Contact List V2",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Contact List V2"
                }],
                controller: "ContactsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/contacts/directives/abShowAvatar.js",
                                    "/js/app/appviews/contacts/version-one/controllers/abContactsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Contact list v3
            .state("contactsv3", {
                url: "/app/contactsv3",
                templateUrl: "/pages/appviews/contacts/version-three/contactslist-3.html",
                pageTitle: "Contact List V3",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Contact List V3"
                }],
                controller: "ContactsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/contacts/directives/abShowAvatar.js",
                                    "/js/app/appviews/contacts/version-one/controllers/abContactsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Contact details
            .state("contactdetailsv1", {
                url: "/app/contacts/version-one/:return/:type/:id",
                templateUrl: "/pages/appviews/contacts/version-one/contactdetails.html",
                pageTitle: "Contact Details",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Contact Details"
                }],
                controller: "ContactDetailsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/contacts/directives/abShowAvatar.js",
                                    "/js/app/appviews/contacts/version-one/controllers/abContactDetailsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Project list version one
            .state("projects", {
                url: "/app/projects/version/one",
                templateUrl: "/pages/appviews/projects/version-one/projects.html",
                pageTitle: "Project List V1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Project List"
                }],
                controller: "ProjectListController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/projects/services/abProjectEnumsSvc.js",
                                    "/js/app/appviews/projects/services/abProjectDataSvc.js",
                                    "/js/app/appviews/projects/services/abProjectsSvc.js",
                                    "/js/app/appviews/projects/controllers/abProjectsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // Project list version two
            .state("projectsv2", {
                url: "/app/projects/version/two",
                templateUrl: "/pages/appviews/projects/version-two/projects.html",
                pageTitle: "Project List",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Project List V2"
                }]
            })

            // Project Details
            .state("projectdetails", {
                url: "/app/project/:id/:action/details",
                templateUrl: "/pages/appviews/projects/version-one/projectdetails.html",
                pageTitle: "Project Details",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Project"
                }, {
                    name: "Details"
                }],
                controller: "ProjectDetailsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/projects/services/abProjectEnumsSvc.js",
                                    "/js/app/appviews/projects/services/abProjectDataSvc.js",
                                    "/js/app/appviews/projects/services/abProjectsSvc.js",
                                    "/js/app/appviews/projects/services/abProjectDetailsSvc.js",
                                    "/js/app/appviews/companies/services/abCompaniesSvc.js",
                                    "/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/projects/controllers/abAddContactsCtrl.js",
                                    "/js/app/appviews/projects/controllers/abAddTaskCtrl.js",
                                    "/js/app/appviews/projects/controllers/abEditTaskCtrl.js",
                                    "/js/app/appviews/projects/controllers/abProjectDetailsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Company List v1
            .state("companylist", {
                url: "/app/company/list/version-one",
                templateUrl: "/pages/appviews/companies/companylist.html",
                pageTitle: "Company List V1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Company"
                }, {
                    name: "Company List V1"
                }],
                controller: "CompaniesController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/companies/services/abCompaniesSvc.js",
                                    "/js/app/appviews/companies/controllers/abCompaniesCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Company List v2
            .state("companylistv2", {
                url: "/app/company/list/version-two",
                templateUrl: "/pages/appviews/companies/companylist-v2.html",
                pageTitle: "Company List V2",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Company"
                }, {
                    name: "Company List V2"
                }],
                controller: "CompaniesController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/companies/services/abCompaniesSvc.js",
                                    "/js/app/appviews/companies/controllers/abCompaniesCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Company Details
            .state("companydetails", {
                url: "/app/company/:id/:action/:view/details",
                templateUrl: "/pages/appviews/companies/companydetails.html",
                pageTitle: "Company Details",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "Company"
                }, {
                    name: "Details"
                }],
                controller: "CompanyDetailsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/appviews/companies/services/abCompaniesSvc.js",
                                    "/js/app/appviews/companies/controllers/abAddContactsCtrl.js",
                                    "/js/app/appviews/contacts/services/abContactsSvc.js",
                                    "/js/app/appviews/companies/controllers/abCompanyDetailsCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })


            // UI elements
            .state("uigeneral", {
                url: "/ui/general",
                templateUrl: "pages/uielements/general.html",
                pageTitle: "General ui elements",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "General"
                }],
                controller: "GeneralController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/uielements/controllers/abGeneralCtrl.js");
                        }
                    ]
                }
            })
            .state("uitypography", {
                url: "/ui/typography",
                templateUrl: "pages/uielements/typography.html",
                pageTitle: "Typography",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Typography"
                }]
            })
            .state("video", {
                url: "/ui/video",
                templateUrl: "pages/uielements/video.html",
                pageTitle: "Displaying videos",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Video"
                }]
            })
            .state("uitabs", {
                url: "/ui/tabs",
                templateUrl: "pages/uielements/tabs.html",
                pageTitle: "ABAdmin custom tabs",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Tabs"
                }]
            })
            // Panels
            .state("uiabadminpanels", {
                url: "/ui/panels/abadmin",
                templateUrl: "pages/uielements/abadminpanels.html",
                pageTitle: "ABAdmin Panels",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Panels"
                }, {
                    name: "ABAdmin"
                }]
            })

            .state("uipanels", {
                url: "/ui/panels",
                templateUrl: "pages/uielements/panels.html",
                pageTitle: "Bootstrap Panels",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Panels"
                }, {
                    name: "Bootstrap"
                }]
            })
            .state("uidragdroppanels", {
                url: "/ui/dragpanels",
                templateUrl: "pages/uielements/dragdroppanels.html",
                pageTitle: "Drag Drop Panels",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Panels"
                }, {
                    name: "Drag Drop"
                }],
                controller: "DragDropPanelsController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/uielements/panels/controllers/abDragDropCtrl.js");
                        }
                    ]
                }
            })
            .state("uiresizepanels", {
                url: "/ui/resizepanels",
                templateUrl: "pages/uielements/resizepanels.html",
                pageTitle: "Resizeable Panels",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Panels"
                }, {
                    name: "Resizeable"
                }],
                controller: "ResizeController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/uielements/panels/controllers/abResizeCtrl.js");
                        }
                    ]
                }
            })
            .state("uigridoptions", {
                url: "/ui/grid",
                templateUrl: "pages/uielements/gridoptions.html",
                pageTitle: "Bootstrap Grid options",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Grid Options"
                }]
            })
            .state("uiprogressbars", {
                url: "/ui/progressbars",
                templateUrl: "pages/uielements/progressbars.html",
                pageTitle: "Progress bars",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Progress Bars"
                }]
            })
            // Buttons
            .state("normalbuttons", {
                url: "/ui/buttons/normal",
                templateUrl: "pages/uielements/normalbuttons.html",
                pageTitle: "Normal Buttons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Buttons"
                }, {
                    name: "Normal"
                }]
            })
            .state("specialbuttons", {
                url: "/ui/buttons/special",
                templateUrl: "pages/uielements/specialbuttons.html",
                pageTitle: "Special Buttons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Buttons"
                }, {
                    name: "Speial"
                }]
            })
            // Tooltips and Popovers
            .state("tooltips", {
                url: "/ui/tooltips",
                templateUrl: "pages/uielements/tooltips.html",
                pageTitle: "Tooltips and Popovers",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Tooltips and Popovers"
                }]
            })
            // Icons
            .state("fontawesome", {
                url: "/ui/icons/fontawesome",
                templateUrl: "pages/uielements/fontawesome.html",
                pageTitle: "FontAwesome 4.7",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Fonts"
                }, {
                    name: "FontAwesome"
                }]
            })
            .state("glyphicons", {
                url: "/ui/icons/glyphicons",
                templateUrl: "pages/uielements/glyphicons.html",
                pageTitle: "GlyphIcons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Fonts"
                }, {
                    name: "Glyphicons"
                }]
            })
            .state("ionicons", {
                url: "/ui/icons/ionicons",
                templateUrl: "pages/uielements/ionicons.html",
                pageTitle: "IonIcons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Fonts"
                }, {
                    name: "IonIcons"
                }]
            })
            .state("flags", {
                url: "/ui/icons/flags",
                templateUrl: "pages/uielements/flags.html",
                pageTitle: "Flags of the world",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Flags"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("css/flags/flags.css");
                        }
                    ]
                }
            })
            .state("badgesandlabels", {
                url: "/ui/badges-labels",
                templateUrl: "pages/uielements/badgeslabels.html",
                pageTitle: "Badges and Labels",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Badges and Labels"
                }]
            })
            //Bootstrap Modals
            .state("bootstrapmodals", {
                url: "/ui/bootstrap/modals",
                templateUrl: "pages/uielements/bootstrapmodals.html",
                pageTitle: "Bootstrap  Modals",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Bootstrap Modals"
                }]
            })

            // Treeviews
            // Simple bootstrap
            .state("bootstraptreeview", {
                url: "/ui/treeviews/bootstrap",
                templateUrl: "pages/uielements/bootstraptreeview.html",
                pageTitle: "Bootstrap Treeviews",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Treeviews"
                }, {
                    name: "Bootstrap"
                }],
                controller: "BootstrapTreeviewController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/uielements/treeviews/controllers/abBootstrapTreeviewCtrl.js");
                        }
                    ]
                }
            })

            // jsTree plugin
            .state("jstree", {
                url: "/ui/treeviews/jstree",
                templateUrl: "pages/uielements/jstree.html",
                pageTitle: "jsTree examples",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Treeviews"
                }, {
                    name: "jsTree"
                }],
                controller: "jsTreeController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/jstree/dist/themes/default/style.min.css",
                                    "/js/plugins/jstree/dist/jstree.min.js",
                                    "/js/app/uielements/treeviews/controllers/abjsTreeCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            .state("jquerynested", {
                url: "/ui/nestedlist/jquery",
                templateUrl: "pages/uielements/jquerynested.html",
                pageTitle: "JQuery Nested List",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "UI Elements"
                }, {
                    name: "Nested Lists"
                }, {
                    name: "jQuery Nested"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/nestedSortable/nestedSortable.css",
                                    "/js/plugins/nestedSortable/jquery.mjs.nestedSortable.js"
                                ]
                            });
                        }
                    ]
                }
            })


            // Tables
            // Static html
            .state("statichtml", {
                url: "/table/statichtml",
                templateUrl: "pages/tables/static.html",
                pageTitle: "Static Html Tables",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Tables"
                }, {
                    name: "Static"
                }]
            })

            // Angular
            // ngRepeat
            .state("ngrepeat", {
                url: "/table/ngrepeat",
                templateUrl: "pages/tables/ngrepeat.html",
                pageTitle: "ngRepeat used for tables",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Tables"
                }, {
                    name: "Angular ngRepeat"
                }],
                controller: "NgRepeatTableController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/tables/services/abNgRepeatSvc.js",
                                    "/js/app/tables/controllers/abNgRepeatTableCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Foo Table
            .state("footable", {
                url: "/table/footable",
                templateUrl: "pages/tables/footable.html",
                pageTitle: "Foo Table",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Tables"
                }, {
                    name: "Foo table"
                }],
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/footable-bootstrap/css/footable.bootstrap.min.css",
                                    "/js/plugins/footable-bootstrap/js/footable.min.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // jqGrid Table
            .state("jqgrid", {
                url: "/table/jqgrid",
                templateUrl: "pages/tables/jqgrid.html",
                pageTitle: "jqGrid",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Tables"
                }, {
                    name: "jqGrid"
                }],
                controller: "JqGridController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/Guriddo_jqGrid_JS_5.2.1/css/ui.jqgrid-bootstrap.css",
                                    "/js/plugins/Guriddo_jqGrid_JS_5.2.1/js/i18n/grid.locale-en.js",
                                    "/js/plugins/Guriddo_jqGrid_JS_5.2.1/js/jquery.jqGrid.min.js",
                                    "/js/app/tables/controllers/abJqGridCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Pages
            // Invoice page
            .state("invoice", {
                url: "/pages/invoice",
                templateUrl: "pages/pages/invoice.html",
                pageTitle: "ABAdmin Invoice",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Pages"
                }, {
                    name: "Invoice"
                }],
                controller: "InvoiceController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/pages/invoice/services/abInvoiceSvc.js",
                                    "/js/app/pages/invoice/controllers/abInvoiceCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Center spinner page
            .state("spinner", {
                url: "/pages/spinner",
                templateUrl: "pages/misc/spinner.html",
                pageTitle: "Move to misc",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Pages"
                }, {
                    name: "Spinner"
                }]
            })

            // Profile page
            .state("profile", {
                url: "/pages/profile",
                templateUrl: "pages/pages/profile.html",
                pageTitle: "User Profile",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "App Views"
                }, {
                    name: "UserProfile"
                }],
                controller: "UserProfileController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/userprofile/services/abUserProfileSvc.js",
                                    "/js/app/userprofile/controllers/abUserProfileCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Pricing Tables
            .state("pricing-v1", {
                url: "/pages/pricing/v1",
                templateUrl: "pages/pages/pricingtable1.html",
                pageTitle: "Pricing Tables version 1",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Pages"
                }, {
                    name: "Pricing Tables"
                }, {
                    name: "Version 1"
                }]
            })
            .state("pricing-v2", {
                url: "/pages/pricing/v2",
                templateUrl: "pages/pages/pricingtable2.html",
                pageTitle: "Pricing Tables version 2",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Pages"
                }, {
                    name: "Pricing Tables"
                }, {
                    name: "Version 2"
                }]
            })

            // Blank Page
            .state("blankpage", {
                url: "/pages/blank",
                templateUrl: "pages/pages/startpage.html",
                pageTitle: "Blank page with 2 boxes",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Pages"
                }, {
                    name: "Blank Starter Page"
                }]
            })


            // Miscellaneous

            // Static filemanager
            .state("staticfilemanager", {
                url: "/miscellaneous/filemanager",
                templateUrl: "pages/misc/staticfilemanager.html",
                pageTitle: "Static Filemanager",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Static Filemanager"
                }]
            })

            //Social buttons
            .state("socialbuttons", {
                url: "/miscellaneous/socialbuttons",
                templateUrl: "pages/misc/socialbuttons.html",
                pageTitle: "Social Buttons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Social Buttons"
                }]
            })
            // Ladda
            .state("ladda", {
                url: "/miscellaneous/ladda",
                templateUrl: "/pages/misc/ladda.html",
                pageTitle: "Loading indicator buttons",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Ladda"
                }],
                controller: "LaddaController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/ladda/dist/ladda.min.css",
                                    "/js/plugins/ladda/dist/spin.min.js",
                                    "/js/plugins/ladda/dist/ladda.min.js",
                                    "/js/app/misc/controllers/abLaddaCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })
            // SweetAlert
            .state("sweetalert", {
                url: "/miscellaneous/sweetalert",
                templateUrl: "pages/misc/sweetalerts.html",
                pageTitle: "SweetAlerts",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "SweetAlerts"
                }],
                controller: "SweetAlert",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/bootstrap-sweetalert/dist/sweetalert.css",
                                    "/js/plugins/bootstrap-sweetalert/dist/sweetalert.js",
                                    "/js/app/misc/controllers/abSweetAlertCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Toastr Playground
            .state("toastr", {
                url: "/miscellaneous/toastr-playground",
                templateUrl: "pages/misc/toasterdemos.html",
                pageTitle: "Toastr Playground",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Toastr Notifications"
                }],
                controller: "ToastrPlayground",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/plugins/toastr/toastr.min.css",
                                    "/js/plugins/toastr/toastr.min.js",
                                    "/js/app/misc/controllers/abToastrCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            .state("tooltipster", {
                url: "/miscellaneous/tolltipster",
                templateUrl: "pages/misc/tooltipster.html",
                pageTitle: "jQuery Tooltipster Plugin",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Tooltipster"
                }]
            })

            // AngularJs Timeline
            .state("timeline", {
                url: "/miscellaneous/timeline",
                templateUrl: "pages/misc/timeline.html",
                pageTitle: "AngularJs Timeline",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "AngularJs Timeline"
                }],
                controller: "AngularTimeline",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: [
                                    "/js/plugins/angular-timeline/dist/angular-timeline-animations.css",
                                    "/js/plugins/angular-timeline/dist/angular-timeline.css",
                                    "/js/plugins/angular-timeline/dist/angular-timeline-bootstrap.css",
                                    "/js/plugins/angular-timeline/dist/angular-timeline.js",
                                    "/js/app/misc/controllers/abTimelineCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // TODO Widget
            .state("todos", {
                url: "/miscellaneous/todo",
                templateUrl: "pages/misc/todo.html",
                pageTitle: "TODO Widget",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "TODOs"
                }],
                controller: "TodoWidget",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/misc/controllers/abTodoCtrl.js");
                        }
                    ]
                }
            })

            // Agile Board Widget
            .state("tasks", {
                url: "/miscellaneous/tasks",
                templateUrl: "pages/misc/tasks.html",
                pageTitle: "Task Board",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Task Board"
                }],
                controller: "TasksController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: ["/js/plugins/ui-sortable/src/sortable.js",
                                    "/js/app/misc/controllers/abTasksCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Issue Tracker
            .state("issuetracker", {
                url: "/misc/issuetracker",
                templateUrl: "pages/misc/issuetracker.html",
                pageTitle: "Issue Tracker",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Misc"
                }, {
                    name: "Issue Tracker"
                }],
                controller: "TrackerController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/issuetracker/services/abTrackerSvc.js",
                                    "/js/app/common/directives/abStatusLabel.js",
                                    "/js/app/issuetracker/filters/abIssueFilter.js",
                                    "/js/app/issuetracker/controllers/abTrackerCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            .state("issuedetail", {
                url: "/misc/issuetracker/details/{id}",
                templateUrl: "/js/app/issuetracker/templates/issue-details.html",
                pageTitle: "Issue Details",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Misc"
                }, {
                    name: "Issue Tracker"
                }, {
                    name: "Details"
                }],
                controller: "EditIssueController",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                series: true,
                                files: ["/js/app/issuetracker/services/abTrackerSvc.js",
                                    "/js/app/common/directives/abStatusLabel.js",
                                    "/js/app/issuetracker/filters/abIssueFilter.js",
                                    "/js/app/issuetracker/controllers/abEditIssueCtrl.js"
                                ]
                            });
                        }
                    ]
                }
            })

            // Forum section
            .state("forum-main", {
                url: "/miscellaneous/forum/main",
                templateUrl: "pages/misc/forum-main.html",
                pageTitle: "Main Forum Page",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Miscellaneous"
                }, {
                    name: "Forums"
                }]
            })

            // Directives / Components

            // PageTitle
            .state("pagetitle", {
                url: "/directive/pagetitle",
                templateUrl: "pages/directives/pagetitle.html",
                pageTitle: "PageTitle Directive",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Directives"
                }, {
                    name: "PageTitle"
                }]
            })

            // InfoBox
            .state("infobox", {
                url: "/directive/infobox",
                templateUrl: "pages/directives/infobox.html",
                pageTitle: "InfoBox directive",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Directives"
                }, {
                    name: "InfoBox"
                }]
            })

            // SmallBox
            .state("smallbox", {
                url: "/directive/smallbox",
                templateUrl: "pages/directives/smallbox.html",
                pageTitle: "SmallBox directive",
                pageBreadCrumbs: [{
                    name: "home"
                }, {
                    name: "Directives"
                }, {
                    name: "SmallBox"
                }]
            })

            // IconBox
            .state("iconbox", {
                url: "/directive/iconbox",
                templateUrl: "pages/directives/iconbox.html",
                pageTitle: "IconBox directive",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Directives"
                }, {
                    name: "IconBox"
                }]
            })

            // Toggle Switch
            .state("toggleswitch", {
                url: "/directive/toggleswitch",
                templateUrl: "/pages/directives/toggleswitch.html",
                pageTitle: "ToggleSwitch Directive",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Directives"
                }, {
                    name: "Toggle Switch"
                }],
                controller: "ToggleSwitch",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/angulardirectives/controllers/abToggleSwitchCtrl.js");
                        }
                    ]
                }
            })

            // Maps
            // jqVectormap
            .state("jqvectormap", {
                url: "/maps/jqvectormap",
                templateUrl: "pages/maps/jqvectormap.html",
                pageTitle: "jQ Vectormap",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Maps"
                }, {
                    name: "jQ Vectormap"
                }]
            })

            // Helpers
            // Css
            .state("csshelpers", {
                url: "/helpers/css",
                templateUrl: "pages/helpers/css.html",
                pageTitle: "CSS Helpers",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Helpers"
                }, {
                    name: "CSS Clases"
                }]
            })
            // Animations
            .state("animationhelpers", {
                url: "/helpers/animations",
                templateUrl: "pages/helpers/animations.html",
                pageTitle: "Animation Helpers",
                pageBreadCrumbs: [{
                    name: "Home"
                }, {
                    name: "Helpers"
                }, {
                    name: "Animation classes"
                }],
                controller: "AnimationHelper",
                resolve: {
                    ctrl: [
                        "$ocLazyLoad",
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load("/js/app/helpers/controllers/abAnimationCtrl.js");
                        }
                    ]
                }
            });

        $urlRouterProvider.otherwise("/welcome");
    }
]);

// Starting angular app
abApp.run(["$rootScope", "$stateParams", "config", "log",
    function ($rootScope, $stateParams, config, log) {
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateNotFound", function (event, toState) {
            log.error("State not found-->");
            console.log("toState: " + toState.name);

        });
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            log.error("$stateChangeError-->");
            console.log("fromState: " + fromState.name + " toState:" + toState.name);
            console.log("error:");
            console.log(error);
            event.preventDefault();
        });

        $rootScope.$on("$viewContentLoading", function () {

        });
        $rootScope.$on("$viewContentLoaded", function () {

        });

        // Adding performance timers to view change.
        if (config.debugState) {
            var stateTimer = null;
            // ui-router state change events
            $rootScope.$on("$stateChangeStart", function () {
                log.info("$stateChangeStart-->");
                stateTimer = performance.now();
            });

            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState) {
                var stateTimerEnd = performance.now();
                log.success("$stateChangeSuccess-->");
                if (fromState.name === "") {
                    fromState.name = "/";
                }
                console.log("fromState: " + fromState.name + " toState: " + toState.name);
                var duration = stateTimerEnd - stateTimer;
                log.info("State change duration: " + duration);
            });

            var timerStart = null;
            $rootScope.$on("$viewContentLoading", function () {
                timerStart = performance.now();
            });

            $rootScope.$on("$viewContentLoaded", function () {
                var timerEnd = performance.now();
                var duration = (timerEnd - timerStart); //.toString().split(".")[0];

                log.warning("View loading time: " + duration + " Milliseconds.");
            });
        }
    }
]);

abApp.controller("mainController", ["$timeout", "$notification", "config",
    function ($timeout, $notification, config) {
        $timeout(function () {
            var ele = $('.loading');
            if ($('.loading') !== undefined) {
                $(ele).empty();
            }
            $('.wrapper').removeClass('hidden');
        }, 2000);

        if (config.debug) {
            $notification.success("Main Controller loaded", "ABAdmin", config.notificationDelay);
        }
    }
]);