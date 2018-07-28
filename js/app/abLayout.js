/* jQuery Layout plugin
 * ========
 * Implements the layout functionality.
 * Fixes the layout height in case min-height fails.
 *
 * @usage activated automatically upon window load.
 *        Configure any options by passing data-option="value"
 *        to the body tag.
 */
+ function ($) {
    "use strict";

    var dataKey = "ab.layout";

    var defaultSettings = {
        slimscroll: true,
        resetHeight: true
    };

    var htmlSelectors = {
        wrapper: ".wrapper",
        contentWrapper: ".content-wrapper",
        layoutBoxed: ".layout-boxed",
        mainFooter: ".main-footer",
        mainHeader: ".main-header",
        sidebar: ".sidebar",
        controlSidebar: ".control-sidebar",
        fixed: ".fixed",
        sidebarMenu: ".sidebar-menu",
        logo: ".main-header .logo"
    };

    var className = {
        fixed: "fixed",
        holdTransition: "hold-transition"
    };

    var Layout = function (options) {
        this.options = options;
        this.bindedResize = false;
        this.activate();
    };

    Layout.prototype.activate = function () {
        this.fix();
        this.fixSidebar();

        $("body").removeClass(className.holdTransition);

        if (this.options.resetHeight) {
            $("body, html, " + htmlSelectors.wrapper).css({
                'height': "auto",
                'min-height': "100%"
            });
        }

        if (!this.bindedResize) {
            $(window).resize(function () {
                this.fix();
                this.fixSidebar();

                $(htmlSelectors.logo + ", " + htmlSelectors.sidebar).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                    this.fix();
                    this.fixSidebar();
                }.bind(this));
            }.bind(this));

            this.bindedResize = true;
        }

        $(htmlSelectors.sidebarMenu).on("expanded.tree", function () {
            this.fix();
            this.fixSidebar();
        }.bind(this));

        $(htmlSelectors.sidebarMenu).on("collapsed.tree", function () {
            this.fix();
            this.fixSidebar();
        }.bind(this));
    };

    Layout.prototype.fix = function () {
        // Remove overflow from .wrapper if layout-boxed exists
        $(htmlSelectors.layoutBoxed + " > " + htmlSelectors.wrapper).css("overflow", "hidden");

        // Get window height and the wrapper height
        var footerHeight = $(htmlSelectors.mainFooter).outerHeight() || 0;
        var headerHeight = $(htmlSelectors.mainHeader).outerHeight() || 0;
        var neg = headerHeight + footerHeight;
        var windowHeight = $(window).height();
        var sidebarHeight = $(htmlSelectors.sidebar).height() || 0;

        // Set the min-height of the content and sidebar based on
        // the height of the document.
        if ($("body").hasClass(className.fixed)) {
            $(htmlSelectors.contentWrapper).css("min-height", windowHeight - footerHeight);
        } else {
            var postSetHeight;

            if (windowHeight >= sidebarHeight) {
                $(htmlSelectors.contentWrapper).css("min-height", windowHeight - neg);
                postSetHeight = windowHeight - neg;
            } else {
                $(htmlSelectors.contentWrapper).css("min-height", sidebarHeight);
                postSetHeight = sidebarHeight;
            }

            // Fix for the control sidebar height
            var $controlSidebar = $(htmlSelectors.controlSidebar);
            if (typeof $controlSidebar !== "undefined") {
                if ($controlSidebar.height() > postSetHeight)
                    $(htmlSelectors.contentWrapper).css("min-height", $controlSidebar.height());
            }
        }
    };

    Layout.prototype.fixSidebar = function () {
        // Make sure the body tag has the .fixed class
        if (!$("body").hasClass(className.fixed)) {
            if (typeof $.fn.slimScroll !== "undefined") {
                $(htmlSelectors.sidebar).slimScroll({
                    destroy: true
                }).height("auto");
            }
            return;
        }

        // Enable slimscroll for fixed layout
        if (this.options.slimscroll) {
            if (typeof $.fn.slimScroll !== "undefined") {
                // Destroy if it exists
                // $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

                // Add slimscroll
                $(htmlSelectors.sidebar).slimScroll({
                    height: ($(window).height() - $(htmlSelectors.mainHeader).height()) + "px"
                });
            }
        }
    };

    // Plugin Definition
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(dataKey);

            if (!data) {
                var options = $.extend({}, defaultSettings, $this.data(), typeof option === "object" && option);
                $this.data(dataKey, (data = new Layout(options)));
            }

            if (typeof option === "string") {
                if (typeof data[option] === "undefined") {
                    throw new Error("No method named " + option);
                }
                data[option]();
            }
        });
    }

    var old = $.fn.layout;

    $.fn.layout = Plugin;
    $.fn.layout.Constuctor = Layout;

    // No conflict mode
    // ================
    $.fn.layout.noConflict = function () {
        $.fn.layout = old;
        return this;
    };

    // Layout DATA-API
    // ===============
    $(window).on("load", function () {
        Plugin.call($("body"));
    });
}(jQuery);