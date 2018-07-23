/*! AdminLTE app.js
* ================
* Main JS application file for AdminLTE v2. This file
* should be included in all pages. It controls some layout
* options and implements exclusive AdminLTE plugins.
*
* @Author  Almsaeed Studio
* @Email   <abdullah@almsaeedstudio.com>
* @version <%= pkg.version %>
* @repository <%= pkg.repository.url %>
*/

// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
throw new Error('ABAdmin requires jQuery')
}

/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive template.
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
                        minimize: "fa fa-plus",
                        maximize: "fa fa-minus",
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
                    // header and sidebar is needed for the fullscreen toggle function.
                    var header = $(selectors.header);

                    var isMinimized = false;

                    var isFullScreen = false;

                    $scope.refresh = function () {
                        $scope.refreshCallback();
                    };
                    var startIcon = icons.minimize;
                    if (angular.isDefined($scope.startCollapsed) ||
                        $scope.startCollapsed === "1" ||
                        $scope.startCollapsed === "true" ||
                        $scope.startCollapsed === true) {
                        startIcon = icons.maximize;
                    }
                    var expandBox = function () {
                        // Swapping icons
                        $(box).find("." + css.faplus)
                            .addClass(css.faminus)
                            .removeClass(css.faplus);
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter)
                            .slideDown($scope.animationSpeed, function () {
                                $rootScope.$broadcast(events.expanded);
                            });
                    };
                    var collapseBox = function () {
                        // Swapping icons
                        $(box).find("." + css.faminus)
                            .removeClass(css.faminus)
                            .addClass(css.faplus);
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter)
                            .slideUp($scope.animationSpeed, function () {
                                $rootScope.$broadcast(events.collapsed, { id: boxId });
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
                    var margin;
                    var sidebarwidth = 0;
                    var sidebar = $(selectors.sidebar);
                    var sideBarIsCollapsed = false;

                    var setFullScreen = function () {
                        // Checking if sidebar is collapsed or not.
                        sideBarIsCollapsed = $("body").hasClass(selectors.sidebarcollapsed);
                        if (sideBarIsCollapsed) {
                            $("body").removeClass(selectors.sidebarcollapsed);
                        }
                        margin = $(selectors.contentwrapper).css("margin-left");
                        sidebarwidth = $(sidebar).css("width");
                        // Hiding sidebar footer icons.
                        $(selectors.sidebarfooter).addClass(css.hide);
                        $(sidebar).css("width", 0);
                        $(header).addClass(css.hide);
                        $(selectors.contentheader).addClass(css.hide);
                        $(selectors.footer).addClass(css.hide);

                        // Hiding sidebar
                        $(selectors.contentwrapper).css("margin-left", 0);
                        // Swapping icons
                        $(box).find("." + css.fanormal)
                            .addClass(css.fafull)
                            .removeClass(css.fanormal);
                    };
                    var removeFullScreen = function () {
                        $(header).removeClass(css.hide);
                        $(selectors.contentheader).removeClass(css.hide);
                        $(selectors.footer).removeClass(css.hide);

                        // Showing sidebar
                        $(selectors.contentwrapper).css("margin-left", 230);
                        $(sidebar).css("width", sidebarwidth);

                        // Sidebar is collapsed or not.
                        if (sideBarIsCollapsed) {
                            $("body").removeClass(selectors.sidebarcollapsed);
                        }

                        // Showing sidebar footer icons
                        $timeout(function () {
                            $(selectors.sidebarfooter).removeClass(css.hide);
                        }, $scope.animationSpeed);

                        // Swapping icons
                        $(box).find("." + css.fafull)
                            .removeClass(css.fafull)
                            .addClass(css.fanormal);
                    };

                    $scope.toggleFullScreen = function () {
                        if (isFullScreen) {
                            removeFullScreen();
                            isFullScreen = false;
                            $rootScope.$broadcast(events.normalscreen, { id: boxId });
                        } else {
                            setFullScreen();
                            isFullScreen = true;
                            $rootScope.$broadcast(events.fullscreen, { id: boxId });
                        }
                    };

                    $scope.removeMe = function () {
                        if (isFullScreen) {
                            removeFullScreen();
                        }
                        $(box).children(selectors.boxbody + ", " + selectors.boxfooter)
                            .slideUp($scope.animationSpeed, function () {
                                $(box).remove();
                                $rootScope.$broadcast(events.removed, { id: boxId });
                            });
                    };

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

                        if (!angular.isDefined($scope.hideRefresh)) {
                            retVal += toolrefresh;
                        }
                        if (!angular.isDefined($scope.hideMaxMin)) {
                            retVal += toolminmax;
                        }
                        if (!angular.isDefined($scope.hideFullScreen)) {
                            retVal += toolfullscreen;
                        }
                        if (!angular.isDefined($scope.hideRemove)) {
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

/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Auto resizing textarea dynamically..
 */
(function () {
    "use strict";
    angular.module("abTextAreaAutoresize", [])
        .directive("abElastic", function ($timeout) {
            return {
                restrict: "A",
                link: function ($scope, element, attrs, ctrl) {
                    element.css({ "height": "auto", "overflow-y": "hidden" });
                    $timeout(function () {
                        element.css("height", element[0].scrollHeight + "px");
                    }, 100);

                    element.on("input", function () {
                        element.css({ 'height': "auto", 'overflow-y': "hidden" });
                        element.css("height", element[0].scrollHeight + "px");

                    });
                }
            }
        });

}());

/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Helper directive to set height to window height.
 */
(function () {
    "use strict";
    angular.module('abFitHeight', [])
        .directive('fitHeight', function () {
            return {
                restrict: "A",
                link: function ($scope, element) {
                    element.css("height", $(window).height() + "px");
                    element.css("min-height", $(window).height() + "px");
                }
            }
        });

}());

/**
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive template.
 */
(function () {
    "use strict";
    angular.module('abFullScreen', [])
        .directive('fullScreen',
            function() {
                return {
                    restrict: "EA",
                    replace: true,
                    template:
                        "<a href='#' data-toggle='tooltip' data-placement='right' title='Fullscreen' ng-click='launchFullScreen();'><i class='fa fa-lg fa-arrows-alt'></i></a>",
                    link: function($scope) {
                        $scope.launchFullScreen = function() {
                            var elem = document.body;
                            if (document.fullScreenElement !== undefined && document.fullScreenElement === null ||
                                document.msFullscreenElement !== undefined && document.msFullscreenElement === null ||
                                document.mozFullScreen !== undefined && !document.mozFullScreen ||
                                document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
                                if (elem.requestFullScreen) {
                                    elem.requestFullScreen();
                                } else if (elem.mozRequestFullScreen) {
                                    elem.mozRequestFullScreen();
                                } else if (elem.webkitRequestFullScreen) {
                                    elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                                } else if (elem.msRequestFullscreen) {
                                    elem.msRequestFullscreen();
                                }
                            } else {
                                if (document.cancelFullScreen) {
                                    document.cancelFullScreen();
                                } else if (document.mozCancelFullScreen) {
                                    document.mozCancelFullScreen();
                                } else if (document.webkitCancelFullScreen) {
                                    document.webkitCancelFullScreen();
                                } else if (document.msExitFullscreen) {
                                    document.msExitFullscreen();
                                }
                            }
                        };
                    }
                };
            });

}());

///**
// * iCheck directive
// * @author Geirr Winnem
// * @copywright 2017- Geirr Winnem. All Rights Reserved
// * @version 1.0.0
// * @link http://www.abadmin.com
// * @license MIT
// * @summary 
// */
(function () {
    "use strict";
    angular.module("abIcheck", [])
        .directive("icheck", function ($timeout) {
            return {
                require: "ngModel",
                scope: {
                    theme: "@",
                    color: "@",
                    value: "@"
                },
                link: function ($scope, element, $attrs, ngModel) {
                    var defaultTheme = "square";
                    if ($scope.theme !== undefined && $scope.theme !== "") {
                        defaultTheme = $scope.theme;
                    }
                    var defaultColor = "green";
                    if ($scope.color !== undefined && $scope.color !== "") {
                        defaultColor = $scope.color;
                    }

                    if (ngModel.$viewValue === $scope.value) {
                        $(element).iCheck("check");
                    } else {
                        $(element).iCheck();
                    }

                    $scope.$watch($attrs["ngModel"], function () {
                        $(element).iCheck("update");
                    });

                    ngModel.$render = function () {
                        $timeout(function() {
                            var newValue = ngModel.$viewValue;
                            if (newValue) {
                                $(element).iCheck("check");
                            } else {
                                $(element).iCheck("uncheck");
                            };
                        });
                    };


                    return $(element).iCheck({
                        checkboxClass: "icheckbox_" + defaultTheme + "-" + defaultColor,
                        radioClass: "iradio_" + defaultTheme + "-" + defaultColor

                    }).on("ifChanged", function (event) {
                        if ($(element).attr("type") === "checkbox" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(event.target.checked);
                            });
                        }
                    }).on("ifClicked", function () {
                        if ($(element).attr("type") === "radio" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                //set up for radio buttons to be de-selectable
                                if (ngModel.$viewValue !== $scope.value) {
                                    ngModel.$setViewValue($scope.value);
                                } else {
                                    ngModel.$setViewValue(null);
                                }
                                ngModel.$render();
                            });
                        }
                    });
                }
            };
        });
}());

/**
 * abIcoBox.js
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive for displaying icon boxes.
 */

(function () {
    "use strict";

    angular.module("abIconBox", [])
        .directive("iconBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attrs) {
                    var attr = attrs;
                    var renderTemplate = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }
                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var template = '<div class="icon-box ' + boxbg + '">' +
                            '<span class="icon-box-icon"><i class="' + boxicon + '"></i>' +
                            '</span><div class="icon-box-text"><span>' + boxmessage + '</span></div></div>';
                        return template;
                    }

                    element.replaceWith($compile(renderTemplate())($scope));
                }
            }
        });
})();

/**
 * abInfobox.js
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive for displaying info boxes.
 */

(function () {
    "use strict";

    angular.module("abInfobox", [])
        .directive("infoBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attr) {
                    var template = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }
                        var boxsolid = attr.boxsolid;
                        if (boxsolid === undefined) {
                            boxsolid = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }

                        var boxtitle = attr.boxtitle;
                        if (boxtitle === undefined) {
                            boxtitle = "";
                        }

                        var boxtitletype = attr.boxtitletype;
                        if (boxtitletype === undefined || boxtitletype === "text" || boxtitletype === "") {
                            boxtitletype = "info-box-text";
                        } else if (boxtitletype === "bold") {
                            boxtitletype = "info-box-bold";
                        }

                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var boxmessagetype = attr.boxmessagetype;
                        if (boxmessagetype === undefined || boxmessagetype === "text" || boxmessagetype === "") {
                            boxmessagetype = "info-box-text";
                        } else if (boxmessagetype === "bold") {
                            boxmessagetype = "info-box-bold";
                        }

                        var progressbarhtml = "";
                        var progress = attr.boxprogress;
                        var progressmessage = attr.boxprogresstext;
                        if (progressmessage === undefined) {
                            progressmessage = "";
                        }
                        if (progress !== undefined && progress !== "") {
                            progressbarhtml = '<div class="progress">' +
                                '<div class="progress-bar" style="width: ' + progress + '%">' +
                                '</div></div>' +
                                '<span class="progress-description">' + progressmessage + '</span>';
                        }

                        var infobox = '<div class="info-box ' + boxsolid + '">' +
                            '<span class="info-box-icon ' + boxbg + ' "><i class="' + boxicon + '"></i></span>' +
                            '<div class="info-box-content">' +
                            '<span class="' + boxtitletype + '">' + boxtitle + '</span>' +
                            '<span class="' + boxmessagetype + '">' + boxmessage + '</span>' +
                            progressbarhtml +
                            '</div></div>';
                        return infobox;
                    }
                    element.replaceWith($compile(template())($scope));
                }
            }
        });
})();

/**
 * abNumbersOnly.js
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Used to enforca that a input element contains numbers only.
 */
(function () {
    "use strict";
    angular.module("abNumbersOnly", [])
        .directive("numbersOnly", function () {
            return {
                require: "ngModel",
                restrict: "EA",
                link: function (scope, elm, attrs, ctrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9]/g, "");

                            if (transformedInput !== text) {
                                ctrl.$setViewValue(transformedInput);
                                ctrl.$render();
                            }
                            return transformedInput;
                        }
                        return undefined;
                    }
                    ctrl.$parsers.push(fromUser);
                }
            };
        });
})();

/**
 * abPageTitle.js
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive for displaying a page title.
 */

(function () {
    "use strict";

    angular.module("abPageTitle", ["ui.router"])
        .directive("abPageTitle", function ($rootScope, $timeout) {
            return {
                restrict: "EA",
                link: function ($scope) {
                    $scope.pageTitle = "";
                    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                        $timeout(function () {
                            $scope.pageTitle = toState.pageTitle;
                        });
                    });
                }
            }
        });
})();

/**
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying a label with priority
 * Bootstrap tooltip is an optin component so in order to activate it you need to do so in the page manually.
 * $(function () { $('[data-toggle="tooltip"]').tooltip() })
 */
(function () {
    "use strict";
    angular.module("abPriorityLabel", [])
        .directive("priorityLabel", function ($compile) {
            return {
                restrict: "E",
                scope: { status: "@" },
                link: function ($scope, element) {
                    var template = function (status) {
                        switch (status) {
                            case 0:
                            case "0":
                            case "low":
                                {
                                    return '<span class="label label-default" title="Low Priority" data-toggle="tooltip" data-placement="top">Low</span>';
                                }
                            case 1:
                            case "1":
                            case "medium":
                                {
                                    return '<span class="label label-warning" title="Medium Priority" data-toggle="tooltip" data-placement="top">Medium</span>';
                                }
                            case 2:
                            case "2":
                            case "high":
                                {
                                    return '<span class="label label-danger" title="High Priority" data-toggle="tooltip" data-placement="top">High</span>';
                                }
                            default:
                                return "<h1>Invalid priority</h1>";
                        }
                    }
                    $scope.$watch("status", function (value) {
                        if (value !== "") {
                            element.replaceWith($compile(template(value))($scope));
                        }
                    });
                }
            }
        });
}());

/**
 * Simple breadcrumb directive
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary 
 */
(function () {
    "use strict";

    angular.module("abSimpleBreadCrumbs", ["ui.router"])
        .directive("simleBreadCrumbs", function ($rootScope, $timeout) {
            return {
                restrict: "A",
                link: function ($scope) {
                    $scope.pageBreadCrumbs = "";
                    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                        $timeout(function () {
                            $scope.pageBreadCrumbs = toState.pageBreadCrumbs;
                        });
                    });
                }
            }
        });
})();

/**
 * Small box widget
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Directive for displaying small boxes.
 */

(function () {
    "use strict";

    angular.module("abSmallBox", [])
        .directive("smallBox", function ($compile) {
            return {
                restrict: "E",
                link: function ($scope, element, attr) {
                    var renderTemplate = function () {
                        var boxbg = attr.boxbg;
                        if (boxbg === undefined) {
                            boxbg = "";
                        }

                        var boxicon = attr.boxicon;
                        if (boxicon === undefined) {
                            boxicon = "";
                        }
                        var boxtitle = attr.boxtitle;
                        if (boxtitle === undefined) {
                            boxtitle = "";
                        }
                        var boxmessage = attr.boxmessage;
                        if (boxmessage === undefined) {
                            boxmessage = "";
                        }

                        var boxfooter = attr.boxfooter;
                        if (boxfooter === undefined) {
                            boxfooter = "";
                        }
                        var boxsref = attr.boxsref;
                        if (boxsref === undefined) {
                            boxsref = "";
                        } else {
                            boxsref = 'ui-sref="' + boxsref + '"';
                        }
                        var footer = '<a ' + boxsref + ' href="javascript:void(0)" class="small-box-footer">' + boxfooter + ' <i class="fa fa-arrow-circle-right"></i></a>';
                        if (boxsref === "") {
                            footer = '<div class="small-box-footer">' + boxfooter + '</div>';
                        }
                        var template = '<div class="small-box ' + boxbg + '">' +
                            '<div class="small-box-inner"><h3>' + boxtitle + '</h3><p>' + boxmessage + '</p></div>' +
                            '<div class="small-box-icon"><i class="' + boxicon + '"></i></div>' +
                            footer +
                            '</div>';
                        return template;
                    }

                    element.replaceWith($compile(renderTemplate())($scope));
                }
            }
        });
})();

/**
 * Helper for loading static content
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary 
 */
(function () {
    "use strict";
    angular.module("abStaticInclude", [])
        .directive("staticInclude", ["$http", "$templateCache", "$compile", "$templateRequest", function ($http, $templateCache, $compile, $templateRequest) {
            return {
                restrict: "EA",
                //replace: true,
                link: function ($scope, element, attrs) {
 
                    $templateRequest(attrs.value).then(function (html) {
                        var template = angular.element(html);
                        // Append it to the directive element
                        $element.append(template);
                        // And let Angular $compile it
                        $compile(template)($scope);

                    }), function (message) {
                        console.log(message);
                    };
                    //debugger;
                    //$scope.$watch(attrs.value, function (newValue) {
                    //    if (!angular.isUndefined(newValue)) {
                    //        $http.get(newValue, { cache: $templateCache }).success(function (response) {
                    //            var contents = element.html(response).contents();
                    //            $compile(contents)($scope);
                    //        });
                    //    }
                    //});
                }
            }
        }]);
}());

/**
 * @author Geirr Winnem
 * @copywright 2017- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Creating a label showing status.
 * Bootstrap tooltip is an optin component so in order to activate it you need to do so in the page manually.
 * $(function () { $('[data-toggle="tooltip"]').tooltip() })
 */
(function () {
    "use strict";
    angular.module("abStatusLabel", [])
        .directive("statusLabel", function ($compile) {
            return {
                restrict: "E",
                scope: { status: "@" },
                link: function ($scope, element) {
                    var template = function (status) {
                        switch (status) {
                            case 0:
                            case "0":
                            case "inactive":
                                {
                                    return '<span class="label label-warning text-black" title="Status Inactive" data-toggle="tooltip" data-placement="top">InActive</span>';
                                }
                            case 1:
                            case "1":
                            case "active":
                                {
                                    return '<span class="label label-info" title="Status Active" data-toggle="tooltip" data-placement="top">Active</span>';
                                }
                            case 2:
                            case "2":
                            case "completed":
                                {
                                    return '<span class="label label-success" title="Status Completed" data-toggle="tooltip" data-placement="top">Completed</span>';
                                }
                            case 3:
                            case "3":
                            case "rejected":
                                {
                                    return '<span class="label label-danger">Rejected</span>';
                                }
                            default:
                                return "<h1>Invalid status</h1>";
                        }
                    }
                    $scope.$watch("status", function (value) {
                        if (value !== "") {
                            element.replaceWith($compile(template(value))($scope));
                        }
                    });
                }
            }
        });
}());

/**
 * abWhenScrollEnds.js
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Used for loading elements in a list when scroll is close to the bottom of the element.
 */
(function () {
    "use strict";
    angular.module("abWhenScrollEnds", [])
        .directive("whenScrollEnds", function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.bind("scroll", function () {
                        var hiddenContentHeight = element.prop("scrollHeight") - element.height();
                        if (hiddenContentHeight - element.scrollTop() <= element.height()) {
                            scope.$apply(attrs.whenScrollEnds);
                        }
                    });
                }
            };
        });
})();
