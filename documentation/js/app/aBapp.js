var aurora = angular.module("aurora", [
    "oc.lazyLoad",
    "ui.router",
    "ui.bootstrap",
    "ui-notification",
    "ngSanitize",
    "abConfig",
    "abSimpleBreadCrumbs",
    "ab.common.ui.pagetitle",
    "abWhenScrollEnds",
    "ab.common.ui.infobox",
    "ab.common.ui.smallbox",
    "ab.common.ui.iconbox",
    "ab.common.ui.icheck",
    "ab.common.ui.numbersonly",
    "ab.common.ui.elastic",
    "ab.common.ui.fitheight",
    "ab.common.ui.statuslabel",
    "ab.common.ui.prioritylabel",
    "abToggleSwitch",
    "ab.common.ui.boxtools",
    "ab.common.ui.fullscreen"
]);

aurora.config(function (
    $stateProvider,
    $urlRouterProvider,
    $compileProvider,
    $qProvider,
    $urlMatcherFactoryProvider
) {
    $urlMatcherFactoryProvider.strictMode(true);

    // Turning on / off unhandled errors
    $qProvider.errorOnUnhandledRejections(true);
    // Turning on / off debug information
    $compileProvider.debugInfoEnabled(false);
    // Turning on pretty urls
    //$locationProvider.html5Mode({enabled: true,requireBase: true});
    $urlRouterProvider.otherwise("/welcome");

    $stateProvider
        .state("welcome", {
            url: "/welcome",
            templateUrl: "documentation/pages/welcome.html",
            pageTitle: "Introduction",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Welcome" }]
        })
        .state("roadmap", {
            url: "/roadmap",
            templateUrl: "documentation/pages/roadmap.html",
            pageTitle: "Roadmaps",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Roadmap" }]
        })
        .state("dependencies", {
            url: "/dependencies",
            templateUrl: "documentation/pages/dependencies.html",
            pageTitle: "Dependencies",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Dependencies" }]
        })
        .state("layouts", {
            url: "/layout",
            templateUrl: "documentation/pages/layout.html",
            pageTitle: "Layouts",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Layout" }]
        })
        .state("plugins", {
            url: "/plugins",
            templateUrl: "documentation/pages/plugins.html",
            pageTitle: "Plugins",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Plugins" }]
        })
        // Html components
        .state("mainheader", {
            url: "/components/html/main-header",
            templateUrl: "documentation/pages/components/html/mainheader.html",
            pageTitle: "Html Component Main Header",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "Main Header" }
            ]
        })
        .state("sidebar", {
            url: "/components/html/sidebar",
            templateUrl: "documentation/pages/components/html/sidebar.html",
            pageTitle: "Html Component Sidebar(Left side treeview)",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "Sidebar" }
            ]
        })
        .state("controlsidebar", {
            url: "/components/html/controlsidebar",
            templateUrl: "documentation/pages/components/html/controlsidebar.html",
            pageTitle: "Html Component Control Sidebar(Right side treeview)",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "Control Sidebar" }
            ]
        })
        .state("htmlbox", {
            url: "/components/html/box",
            templateUrl: "documentation/pages/components/html/box.html",
            pageTitle: "Html Component Box",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "Box" }
            ]
        })
        .state("htmlinfobox", {
            url: "/components/html/infobox",
            templateUrl: "documentation/pages/components/html/infobox.html",
            pageTitle: "Html Component InfoBox",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "InfoBox" }
            ]
        })
        .state("htmliconbox", {
            url: "/components/html/iconbox",
            templateUrl: "documentation/pages/components/html/infobox.html",
            pageTitle: "Html Component IconBox",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "InfoBox" }
            ]
        })
        .state("htmltreeview", {
            url: "/components/html/treeview",
            templateUrl: "documentation/pages/components/html/treeview.html",
            pageTitle: "Html Component Treeview",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Html" },
                { name: "Treeview" }
            ]
        })
        // jQuery Components
        .state("jslayout", {
            url: "/components/js/layout",
            templateUrl: "documentation/pages/components/jquery/jslayout.html",
            pageTitle: "Js Layout",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Layout" }
            ]
        })
        .state("jssidebar", {
            url: "/components/js/sidebar",
            templateUrl: "documentation/pages/components/jquery/jssidebar.html",
            pageTitle: "Js Sidebar",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Sidebar" }
            ]
        })
        .state("jspushmenu", {
            url: "/components/js/pushmenu",
            templateUrl: "documentation/pages/components/jquery/jspushmenu.html",
            pageTitle: "Js PushMenu",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "PushMenu" }
            ]
        })
        .state("jscontrolsidebar", {
            url: "/components/js/controlsidebar",
            templateUrl:
                "documentation/pages/components/jquery/jscontrolsidebar.html",
            pageTitle: "Js Control Sidebar",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Control Sidebar" }
            ]
        })
        .state("jsboxrefresh", {
            url: "/components/js/boxrefresh",
            templateUrl: "documentation/pages/components/jquery/jsboxrefresh.html",
            pageTitle: "Js Box Refresh",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Box Refresh" }
            ]
        })
        .state("jstodolist", {
            url: "/components/js/todolist",
            templateUrl: "documentation/pages/components/jquery/jstodolist.html",
            pageTitle: "Js Todolist",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Todolist" }
            ]
        })
        .state("jstree", {
            url: "/components/js/treewidget",
            templateUrl: "documentation/pages/components/jquery/jstree.html",
            pageTitle: "Js Tree Widget",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Components" },
                { name: "Js" },
                { name: "Tree Widget" }
            ]
        })

        // Directives
        .state("abpboxtools", {
            url: "/Directives/abboxtools",
            templateUrl: "documentation/pages/directives/abboxtools.html",
            pageTitle: "Box-tools Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "box-tools" }
            ]
        })
        .state("abelastic", {
            url: "/Directives/abelastic",
            templateUrl: "documentation/pages/directives/abelastic.html",
            pageTitle: "ab-elastic Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "ab-elastic" }
            ]
        })
        .state("abfitheight", {
            url: "/Directives/abfitheight",
            templateUrl: "documentation/pages/directives/abfitheight.html",
            pageTitle: "ab-fitheight Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "ab-fitheight" }
            ]
        })
        .state("fullscreen", {
            url: "/Directives/abfullscreen",
            templateUrl: "documentation/pages/directives/abfullscreen.html",
            pageTitle: "Full-screen Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "full-screen" }
            ]
        })
        .state("icheck", {
            url: "/Directives/icheck",
            templateUrl: "documentation/pages/directives/abicheck.html",
            pageTitle: "Icheck Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "icheck" }
            ]
        })
        .state("iconbox", {
            url: "/Directives/iconbox",
            templateUrl: "documentation/pages/directives/abiconbox.html",
            pageTitle: "Icon-box Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "icon-box" }
            ]
        })
        .state("infobox", {
            url: "/Directives/infobox",
            templateUrl: "documentation/pages/directives/abinfobox.html",
            pageTitle: "Info-box Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "info-box" }
            ]
        })
        .state("nouislider", {
            url: "/Directives/noUISlider",
            templateUrl: "documentation/pages/directives/abnouislider.html",
            pageTitle: "ab-slider Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "ab-slider" }
            ]
        })
        .state("numbersonly", {
            url: "/Directives/numbersonly",
            templateUrl: "documentation/pages/directives/abnumbersonly.html",
            pageTitle: "Numbers-only Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "numbers-only" }
            ]
        })
        .state("abpagetitle", {
            url: "/Directives/abpagetitle",
            templateUrl: "documentation/pages/directives/abpagetitle.html",
            pageTitle: "ABAdmin ab-page-title Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "ab-page-title" }
            ]
        })
        .state("abprioritylabel", {
            url: "/Directives/abprioritylabel",
            templateUrl: "documentation/pages/directives/abprioritylabel.html",
            pageTitle: "Priority-label Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "priority-label" }
            ]
        })
        .state("simplebreadcrumb", {
            url: "/Directives/simplebreadcrumb",
            templateUrl: "documentation/pages/directives/absimplebreadcrumbs.html",
            pageTitle: "Simple-breadcrumb Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "simple breadcrumb" }
            ]
        })
        .state("slimscroll", {
            url: "/Directives/slimscroll",
            templateUrl: "documentation/pages/directives/slimscroll.html",
            pageTitle: "Slimscroll Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "slimscroll" }
            ]
        })
        .state("smallbox", {
            url: "/Directives/smallbox",
            templateUrl: "documentation/pages/directives/absmallbox.html",
            pageTitle: "Small-box Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "small-box" }
            ]
        })
        .state("statuslabel", {
            url: "/Directives/statuslabel",
            templateUrl: "documentation/pages/directives/abstatuslabel.html",
            pageTitle: "Status-label Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "status-label" }
            ]
        })
        .state("todolist", {
            url: "/Directives/todolist",
            templateUrl: "documentation/pages/directives/abtodolist.html",
            pageTitle: "Todo-list Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "todo-list" }
            ]
        })
        .state("toggleswitch", {
            url: "/Directives/toggleswitch",
            templateUrl: "documentation/pages/directives/toggleswitch.html",
            pageTitle: "Toggle-switch Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "toggle-switch" }
            ]
        })
        .state("whenscrollends", {
            url: "/Directives/whenscrollends",
            templateUrl: "documentation/pages/directives/abwhenscrollends.html",
            pageTitle: "When-scroll-ends Directive",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Directives" },
                { name: "when-scroll-ends" }
            ]
        })

        // Services
        .state("config", {
            url: "/services/config",
            templateUrl: "documentation/pages/services/config.html",
            pageTitle: "Config Service",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Service" },
                { name: "config" }
            ]
        })
        .state("abdatasvc", {
            url: "/services/abdatasvc",
            templateUrl: "documentation/pages/services/abDataSvc.html",
            pageTitle: " abDataSvc Service",
            pageBreadCrumbs: [
                { name: "Home" },
                { name: "Service" },
                { name: "abDataSvc" }
            ]
        })
        .state("browser", {
            url: "/browser",
            templateUrl: "documentation/pages/browser.html",
            pageTitle: "Browser Support",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Browser Support" }]
        })
        .state("faq", {
            url: "/faq",
            templateUrl: "documentation/pages/faq.html",
            pageTitle: "Frequently Asked Questions",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Faq" }]
        })
        .state("starter", {
            url: "/starter",
            templateUrl: "documentation/pages/starter.html",
            pageTitle: "Simple starter page",
            pageBreadCrumbs: [{ name: "Home" }, { name: "Starter" }]
        });
});

// Starting angular app
aurora.run([
    "$rootScope",
    "$state",
    "$stateParams",
    function ($rootScope, $state, $stateParams) {
        $rootScope.$stateParams = $stateParams;
    }
]);
aurora.controller("MainController", [
    "$scope",
    "config",
    "$notification",
    function ($scope, config, $notification) {
        $scope.config = config;
        $notification.info(
            "Introduction",
            "ABAdmin Documentation",
            config.notificationDelay
        );
    }
]);
