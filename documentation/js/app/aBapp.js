var aurora = angular.module('aurora',
    [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'ui-notification',
        'ngSanitize',
        'abConfig',
        'abSimpleBreadCrumbs',
        'abPageTitle',
        'abWhenScrollEnds',
        'abInfobox',
        'abSmallBox',
        'abIconBox',
        'abStatusLabel',
        'abPriorityLabel',
        'abIcheck',
        'abNumbersOnly',
        'abTextAreaAutoresize',
        'abFitHeight'
    ]);

aurora.config(

    function (
        $stateProvider,
        $urlRouterProvider,
        $compileProvider,
        $qProvider,
        $urlMatcherFactoryProvider) {

        $urlMatcherFactoryProvider.strictMode(true);

        // Turning on / off unhandled errors
        $qProvider.errorOnUnhandledRejections(true);
        // Turning on / off debug information
        $compileProvider.debugInfoEnabled(false);
        // Turning on pretty urls
        //$locationProvider.html5Mode({enabled: true,requireBase: true});
        $urlRouterProvider.otherwise('/welcome');

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'documentation/pages/welcome.html',
                pageTitle: 'Introduction',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Welcome' }]
            })
            .state('abadmindirectives', {
                url: '/abadmin/directives',
                templateUrl: 'documentation/pages/abadmindirectives.html',
                pageTitle: 'Exclusive Directives',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Exclusive Directives' }]
            })
            .state('roadmap', {
                url: '/roadmap',
                templateUrl: 'documentation/pages/roadmap.html',
                pageTitle: 'Roadmaps',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Roadmap' }]
            })
            .state('dependencies', {
                url: '/dependencies',
                templateUrl: 'documentation/pages/dependencies.html',
                pageTitle: 'Dependencies',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Dependencies' }]

            })
            .state('layouts', {
                url: '/layout',
                templateUrl: 'documentation/pages/layout.html',
                pageTitle: 'Layouts',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Layout' }]

            })
            .state('plugins', {
                url: '/plugins',
                templateUrl: 'documentation/pages/plugins.html',
                pageTitle: 'Plugins',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Plugins' }]

            })
            .state('mainheader', {
                url: '/components/html/main-header',
                templateUrl: 'documentation/pages/mainheader.html',
                pageTitle: 'Html Component Main Header',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Main Header' }]

            })
            .state('sidebar', {
                url: '/components/html/sidebar',
                templateUrl: 'documentation/pages/sidebar.html',
                pageTitle: 'Html Component Sidebar(Left side treeview)',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Sidebar' }]

            })
            .state('controlsidebar', {
                url: '/components/html/controlsidebar',
                templateUrl: 'documentation/pages/controlsidebar.html',
                pageTitle: 'Html Component Control Sidebar(Right side treeview)',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Control Sidebar' }]

            })
            .state('box', {
                url: '/components/html/box',
                templateUrl: 'documentation/pages/box.html',
                pageTitle: 'Html Component Box',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Box' }]

            })
            .state('htmlinfobox', {
                url: '/components/html/infobox',
                templateUrl: 'documentation/pages/infobox.html',
                pageTitle: 'Html Component InfoBox',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'InfoBox' }]

            })
            .state('htmliconbox', {
                url: '/components/html/iconbox',
                templateUrl: 'documentation/pages/iconbox.html',
                pageTitle: 'Html Component IconBox',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'IconBox' }]
            })
            .state('htmltreeview', {
                url: '/components/html/treeview',
                templateUrl: 'documentation/pages/treeview.html',
                pageTitle: 'Html Component Treeview',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Treeview' }]

            })
            .state('htmltodolist', {
                url: '/components/html/todolist',
                templateUrl: 'documentation/pages/todolist.html',
                pageTitle: 'Html Component Todolist',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Html' }, { name: 'Todolist' }]

            })
            .state('jscomponents', {
                url: '/components/js',
                templateUrl: 'documentation/pages/jscomponents.html',
                pageTitle: 'Js Components',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }]

            })
            .state('jslayout', {
                url: '/components/js/layout',
                templateUrl: 'documentation/pages/jslayout.html',
                pageTitle: 'Js Layout',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Layout' }]

            })
            .state('jssidebar', {
                url: '/components/js/sidebar',
                templateUrl: 'documentation/pages/jssidebar.html',
                pageTitle: 'Js Sidebar',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Sidebar' }]

            })
            .state('jspushmenu', {
                url: '/components/js/pushmenu',
                templateUrl: 'documentation/pages/jspushmenu.html',
                pageTitle: 'Js PushMenu',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'PushMenu' }]

            })
            .state('jscontrolsidebar', {
                url: '/components/js/controlsidebar',
                templateUrl: 'documentation/pages/jscontrolsidebar.html',
                pageTitle: 'Js Control Sidebar',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Control Sidebar' }]

            })
            .state('jsbox', {
                url: '/components/js/box',
                templateUrl: 'documentation/pages/jsbox.html',
                pageTitle: 'Js Box Widget',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Box Widget' }]

            })
            .state('jsboxrefresh', {
                url: '/components/js/boxrefresh',
                templateUrl: 'documentation/pages/jsboxrefresh.html',
                pageTitle: 'Js Box Refresh',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Box Refresh' }]

            })
            .state('jstodolist', {
                url: '/components/js/todolist',
                templateUrl: 'documentation/pages/jstodolist.html',
                pageTitle: 'Js Todolist',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Todolist' }]

            })
            .state('jstree', {
                url: '/components/js/treewidget',
                templateUrl: 'documentation/pages/jstree.html',
                pageTitle: 'Js Tree Widget',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Components' }, { name: 'Js' }, { name: 'Tree Widget' }]

            })

            // ABAdmin Directives
            .state('iconbox', {
                url: '/Directives/iconbox',
                templateUrl: 'documentation/pages/icon-box.html',
                pageTitle: 'Icon-box Directive',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Directives' }, { name: 'icon-box' }]

            })
            .state('smallbox', {
                url: '/Directives/smallbox',
                templateUrl: 'documentation/pages/abSmallbox.html',
                pageTitle: 'Small-box Directive',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Directives' }, { name: 'small-box' }]

            })

            // ABAdmin Services
            .state('config', {
                url: '/services/config',
                templateUrl: 'documentation/pages/config.html',
                pageTitle: 'Config Service',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Service' }, { name: 'config' }]
            })
            .state('abdatasvc', {
                url: '/services/abdatasvc',
                templateUrl: 'documentation/pages/abDataSvc.html',
                pageTitle: ' abDataSvc Service',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Service' }, { name: 'abDataSvc' }]
            })
            .state('modaldialog', {
                url: '/services/modaldialog',
                templateUrl: 'documentation/pages/modaldialogs.html',
                pageTitle: 'modalDialog Service',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Service' }, { name: 'modalDialog' }]
            })
            .state('browser', {
                url: '/browser',
                templateUrl: 'documentation/pages/browser.html',
                pageTitle: 'Browser Support',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Browser Support' }]
            })
            .state('faq', {
                url: '/welcome',
                templateUrl: 'documentation/pages/faq.html',
                pageTitle: 'Frequently Asked Questions',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Faq' }]
            })
            .state('aspnetmvc6', {
                url: '/implementations',
                templateUrl: 'documentation/pages/aspnetmvc.html',
                pageTitle: 'Implementation ASP.NET Mvc6',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Implementation' }, { name: 'ASP.NET MVC6' }]
            })
            .state('angularjs', {
                url: '/implementations',
                templateUrl: 'documentation/pages/angularjs.html',
                pageTitle: 'Implementation AngularJs',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Implementation' }, { name: 'AngularJs' }]
            })
            .state('angularjsphp', {
                url: '/implementations',
                templateUrl: 'documentation/pages/angularjsphp.html',
                pageTitle: 'Implementation AngularJs PHP',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Implementation' }, { name: 'AngularJs PHP' }]
            })
            .state('starter', {
                url: '/starter',
                templateUrl: 'documentation/pages/starter.html',
                pageTitle: 'Simple starter page',
                pageBreadCrumbs: [{ name: 'Home' }, { name: 'Starter' }]
            });


    }); // closes $routerApp.config()


// Starting angular app
aurora.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$stateParams = $stateParams;
    }]);
aurora.controller('MainController', ['$scope', 'config', '$notification', function ($scope, config, $notification) {
    $scope.config = config;
    $notification.info("Introduction", "ABAdmin Documentation", config.notificationDelay);
}]);
