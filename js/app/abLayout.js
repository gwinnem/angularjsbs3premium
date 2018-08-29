/* Layout()
 * ========
 * Implements AdminLTE layout.
 * Fixes the layout height in case min-height fails.
 *
 * @usage activated automatically upon window load.
 *        Configure any options by passing data-option="value"
 *        to the body tag.
 */
+function ($) {
    'use strict';

    var dataKey = 'ab.layout';

    var defaults = {
        slimscroll: true,
        resetHeight: true
    };

    var htmlSelector = {
        wrapper: ".wrapper",
        contentWrapper: ".content-wrapper",
        layoutNormal: ".layout-normal",
        layoutFixed: ".fixed",
        layoutBoxed: ".layout-boxed",
        mainFooter: ".main-footer",
        mainHeader: ".main-header",
        sidebar: ".sidebar",
        controlSidebar: ".control-sidebar",
        sidebarMenu: ".sidebar-menu",
        logo: ".main-header .logo"
    };

    var className = {
        fixed: 'fixed',
        holdTransition: 'hold-transition',
        layoutNormal: "layout-normal",
        layoutFixed: "fixed",
        layoutBoxed: "layout-boxed",
        fixedFooter: "main-footer-fixed"
    };

    var Layout = function (options) {
        this.options = options;
        this.bindedResize = false;
        this.activate();
    };
        
    Layout.prototype = {
        activate: function () {
            this.fix();
            this.fixSidebar();

            $('body').removeClass(className.holdTransition);

            if (this.options.resetHeight) {
                $('body, html, ' + htmlSelector.wrapper).css({
                    'height': 'auto',
                    'min-height': '100%'
                });
            }

            if (!this.bindedResize) {
                $(window).resize(function () {
                    this.fix();
                    this.fixSidebar();

                    $(htmlSelector.logo + ', ' + htmlSelector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        this.fix();
                        this.fixSidebar();
                    }.bind(this));
                }.bind(this));

                this.bindedResize = true;
            }

            // Event listeners
            $(htmlSelector.sidebarMenu).on('expanded.tree', function () {
                this.fix();
                this.fixSidebar();
            }.bind(this));

            $(htmlSelector.sidebarMenu).on('collapsed.tree', function () {
                this.fix();
                this.fixSidebar();
            }.bind(this));
        },
        fix: function () {
            // Remove overflow from .wrapper if layout-boxed exists
            $(htmlSelector.layoutBoxed + ' > ' + htmlSelector.wrapper).css('overflow', 'hidden');

            // Get window height and the wrapper height
            var footerHeight = $(htmlSelector.mainFooter).outerHeight() || 0;
            var headerHeight = $(htmlSelector.mainHeader).outerHeight() || 0;
            var neg = headerHeight + footerHeight;
            var windowHeight = $(window).height();
            var sidebarHeight = $(htmlSelector.sidebar).height() || 0;

            // Set the min-height of the content and sidebar based on
            // the height of the document.
            if ($('body').hasClass(className.fixed)) {
                $(htmlSelector.contentWrapper).css('min-height', windowHeight - footerHeight);
            } else {
                var postSetHeight;

                if (windowHeight >= sidebarHeight) {
                    $(htmlSelector.contentWrapper).css('min-height', windowHeight - neg);
                    postSetHeight = windowHeight - neg;
                } else {
                    $(htmlSelector.contentWrapper).css('min-height', sidebarHeight);
                    postSetHeight = sidebarHeight;
                }

                // Fix for the control sidebar height
                var $controlSidebar = $(htmlSelector.controlSidebar);
                if (typeof $controlSidebar !== 'undefined') {
                    if ($controlSidebar.height() > postSetHeight)
                        $(htmlSelector.contentWrapper).css('min-height', $controlSidebar.height());
                }
            }
        },
        fixSidebar: function () {
            // Removing slimscroll if layout is not layout-fixed
            if (!$("body").hasClass(className.layoutFixed)) {
                if (typeof $.fn.slimScroll !== "undefined") {
                    $(htmlSelector.sidebar).slimScroll({
                        destroy: true
                    }).height("auto");
                }
                return;
            } else {
                // Add slimscroll for layout-fixed
                $(htmlSelector.sidebar).slimScroll({
                    height: ($(window).height() - $(htmlSelector.mainHeader).height()) + "px",
                    size: '0px',
                    position: 'left',
                    //color: '#ffcc00',
                    alwaysVisible: false,
                    //distance: '10px',
                    railVisible: false,
                    //railColor: '#222',
                    //railOpacity: 0.3,
                    //wheelStep: 5,
                    //allowPageScroll: true,
                    //disableFadeOut: false
                });
            }
        }
    }


    // Plugin Definition
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(dataKey);

            if (!data) {
                var options = $.extend({}, defaults, $this.data(), typeof option === 'object' && option);
                $this.data(dataKey, (data = new Layout(options)));
            }

            if (typeof option === 'string') {
                if (typeof data[option] === 'undefined') {
                    throw new Error('No method named ' + option);
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
    $(window).on('load', function () {
        Plugin.call($('body'));
        Plugin.call($(this), 'activate');
    });
}(jQuery);
