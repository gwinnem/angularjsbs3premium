/**
 * Boxtools widget.
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Showing tools for the box component..
 */
(function () {
    "use strict";
    angular.module('abBoxTools', [])
        .directive('boxTools', function ($compile, $rootScope, $timeout) {
            return {
                restrict: "EA",
                replace: true,
                scope: {
                    refreshCallback: "&",
                    startCollapsed: "@startCollapsed",
                    hideRefresh: "@hideRefresh",
                    hideMaxMin: "@hideMaxMin",
                    hideFullScreen: "@hideFullScreen",
                    hideRemove: "@hideRemove",
                    animationSpeed: "@animationSpeed"
                },
                link: function ($scope, element) {

                    // Setting up defaults
                    if (!angular.isDefined($scope.animationSpeed)) {
                        $scope.animationSpeed = 500;
                    }

                    var events = {
                        collapsed: "collapsed.boxwidget",
                        expanded: "expanded.boxwidget",
                        removed: "removed.boxwidget",
                        fullscreen: "fullscreen-boxwidget",
                        normalscreen: "normalscreen-boxwidget"
                    };

                    var icons = {
                        minimize: "fa fa-minus",
                        maximize: "fa fa-plus",
                        remove: "fa fa-times",
                        normalscreen: "fa fa-arrows-alt",
                        fullscreen: "fa fa-compress",
                        refresh: "fa fa-refresh"
                    };

                    var selectors = {
                        box: ".box",
                        boxheader: ".box-header",
                        collapsed: ".collapsed-box",
                        expanded: ".expanded-box",
                        fullscreen: ".fullscreen-box",
                        normalscreen: ".normalscreen-box",
                        boxtitle: ".box-title",
                        boxbody: ".box-body",
                        boxfooter: ".box-footer",
                        boxtools: ".box-tools",
                        sidebar: "aside",
                        sidebarfooter: ".sidebar-footer",
                        header: "header",
                        contentheader: ".content-header",
                        contentwrapper: ".content-wrapper",
                        footer: "footer",
                        pagewrapper: ".wrapper",
                        sidebarcollapsed: "sidebar-collapse"
                    };

                    var css = {
                        hide: "hide",
                        collapsedbox: "collapsed-box",
                        expandedbox: "expanded-box",
                        fullscreen: "fullscreen-box",
                        normalscreen: "normalscreen-box",
                        fa: "fa",
                        faplus: "fa-plus",
                        faminus: "fa-minus",
                        faremove: "fa-remove",
                        farefresh: "fa-refresh",
                        fanormal: "fa-arrows-alt",
                        fafull: "fa-compress"
                    };

                    // element is the box-tools
                    $scope.element = element;
                    var box = $($scope.element).closest(selectors.box);
                    var boxId = $(box).attr("id");

                    var isMinimized = false;
                    var isFullScreen = false;

                    $scope.refresh = function () {
                        $scope.refreshCallback();
                    };

                    var expandBox = function () {
                        // Swapping icons
                        $(box).find("." + css.faplus).addClass(css.faminus).removeClass(css.faplus);
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter).slideDown($scope.animationSpeed, function () {
                            $rootScope.$broadcast(events.expanded);
                        });
                    };

                    var collapseBox = function () {
                        // Swapping icons
                        $(box).find("." + css.faminus).removeClass(css.faminus).addClass(css.faplus);
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter).slideUp($scope.animationSpeed, function () {
                            $rootScope.$broadcast(events.collapsed, {
                                id: boxId
                            });
                        });
                    };

                    $scope.toggleMinMax = function () {
                        if (isMinimized) {
                            isMinimized = false;
                            expandBox();
                        } else {
                            isMinimized = true;
                            collapseBox();
                        }
                    };

                    var setFullScreen = function () {
                        expandBox();
                        isMinimized = false;
                        $(selectors.sidebar).addClass(css.hide);
                        $(selectors.header).addClass(css.hide);
                        $(selectors.contentheader).addClass(css.hide);
                        $(selectors.footer).addClass(css.hide);
                        $(box).addClass("fullscreen");
                        $(box).find("." + css.fanormal).addClass(css.fafull).removeClass(css.fanormal);
                    };

                    var removeFullScreen = function () {
                        $(selectors.sidebar).removeClass(css.hide);
                        $(selectors.header).removeClass(css.hide);
                        $(selectors.contentheader).removeClass(css.hide);
                        $(selectors.footer).removeClass(css.hide);

                        $(box).removeClass("fullscreen");
                        $(box).find("." + css.fafull).removeClass(css.fafull).addClass(css.fanormal);
                    };

                    $scope.toggleFullScreen = function () {
                        if (isFullScreen) {
                            removeFullScreen();
                            isFullScreen = false;
                            $rootScope.$broadcast(events.normalscreen, {
                                id: boxId
                            });
                        } else {
                            setFullScreen();
                            isFullScreen = true;
                            $rootScope.$broadcast(events.fullscreen, {
                                id: boxId
                            });
                        }
                    };

                    $scope.removeMe = function () {
                        if (isFullScreen) {
                            removeFullScreen();
                        }
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter)
                            .slideUp($scope.animationSpeed, function () {
                                $(box).remove();
                                $rootScope.$broadcast(events.removed, {
                                    id: boxId
                                });
                            });
                    };

                    var startIcon = icons.minimize;
                    if (angular.isDefined($scope.startCollapsed) &&
                        $scope.startCollapsed === "1" ||
                        $scope.startCollapsed === "true" ||
                        $scope.startCollapsed === true) {
                        startIcon = icons.maximize;
                        $scope.toggleMinMax();
                        $scope.hideMaxMin = "0";
                    }

                    var template = function () {
                        var toolstart = "<div class='box-tools pull-right'>";
                        var toolend = "</div>";
                        var toolrefresh =
                            "<button type='button' class='btn btn-box-tool' data-toggle='tooltip' title='Refresh' ng-click='refresh()'><i class='" +
                            icons.refresh +
                            "'></i></button>";
                        var toolminmax =
                            "<button type='button' class='btn btn-box-tool' data-toggle='tooltip' title='Toggle Collapse' ng-click='toggleMinMax()'><i class='" +
                            startIcon +
                            "'></i></button>";
                        var toolfullscreen =
                            "<button type='button' class='btn btn-box-tool' data-toggle='tooltip' title='Toggle Full screen' ng-click='toggleFullScreen(this)'><i class='" +
                            icons.normalscreen +
                            "'></i></button>";
                        var toolremove =
                            "<button type='button' class='btn btn-box-tool' data-toggle='tooltip' title='Remove' ng-click='removeMe()'><i class='" +
                            icons.remove +
                            "'></i></button>";
                        var retVal = toolstart;

                        if (!angular.isDefined($scope.hideRefresh) || $scope.hideRefresh === "0" || $scope.hideRefresh === "false") {
                            retVal += toolrefresh;
                        }
                        if (!angular.isDefined($scope.hideMaxMin) || $scope.hideMaxMin === "0" || $scope.hideMaxMin === "false") {
                            retVal += toolminmax;
                        }
                        if (!angular.isDefined($scope.hideFullScreen) || $scope.hideFullScreen === "0" || $scope.hideFullScreen === "false") {
                            retVal += toolfullscreen;
                        }
                        if (!angular.isDefined($scope.hideRemove) || $scope.hideRemove === "0" || $scope.hideRemove === "false") {
                            retVal += toolremove;
                        }
                        retVal += toolend;
                        return retVal;
                    };
                    element.replaceWith($compile(template())($scope));


                }

            };
        });

}());