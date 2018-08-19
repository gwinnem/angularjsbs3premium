/* jQuery PushMenu() plugin.
 * ==========
 * Adds the push menu functionality to the sidebar.
 *
 * @usage: $('.btn').pushMenu(options)
 *          or add [data-toggle="push-menu"] to any button
 *          Pass any option as data-option="value"
 */

+function ($) {
    'use strict';

    var dataKey = 'ab.pushmenu';
    var pushMenuOpen = 'open';
    var pushMenuClosed = 'closed';

    var defaultConfig = {
        collapseScreenSize: 767,
        expandOnHover: false,
        expandTransitionDelay: 100
    };

    var htmlSelectors = {
        body: 'body',
        collapsed: '.sidebar-collapse',
        open: '.sidebar-open',
        mainSidebar: '.main-sidebar',
        sidebarFooter: '.sidebar-footer',
        contentWrapper: '.content-wrapper',
        button: '[data-toggle="push-menu"]',
        expanded: '.sidebar-expanded-on-hover',
        layoutFixed: '.fixed'
    };

    var pushMenuClassName = {
        collapsed: 'sidebar-collapse',
        open: 'sidebar-open',
        mini: 'sidebar-mini',
        expanded: 'sidebar-expanded-on-hover',
        expandFeature: 'sidebar-mini-expand-feature',
        layoutFixed: 'fixed',
        hidden: 'hidden'
    };

    var pushMenuEvent = {
        expanded: 'expanded.pushMenu',
        collapsed: 'collapsed.pushMenu'
    };

    // PushMenu Class Definition
    // =========================
    var PushMenu = function (options) {
        this.options = options;
        this.init();
    };

    PushMenu.prototype.init = function () {
        if (this.options.expandOnHover || $(htmlSelectors.body).is(htmlSelectors.mini + htmlSelectors.layoutFixed)) {
            this.expandOnHover();
            $(htmlSelectors.body).addClass(pushMenuClassName.expandFeature);
        }

        $(htmlSelectors.contentWrapper).click(function () {
            // Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= this.options.collapseScreenSize && $(htmlSelectors.body).hasClass(pushMenuClassName.open)) {
                this.close();
            }
        }.bind(this));
    };

    PushMenu.prototype.toggle = function () {
        var windowWidth = $(window).width();
        var isOpen = !$(htmlSelectors.body).hasClass(pushMenuClassName.collapsed);

        if (windowWidth <= this.options.collapseScreenSize) {
            isOpen = $(htmlSelectors.body).hasClass(pushMenuClassName.open);
        }
        // Hiding sidebar bottom menu if it exists
        if (!isOpen) {
            $(htmlSelectors.sidebarFooter).removeClass(pushMenuClassName.hidden);
            this.open();
        } else {
            $(htmlSelectors.sidebarFooter).addClass(pushMenuClassName.hidden);
            this.close();
        }
    };

    PushMenu.prototype.open = function () {
        localStorage.setItem(dataKey, pushMenuOpen);
        var windowWidth = $(window).width();

        if (windowWidth > this.options.collapseScreenSize) {
            $(htmlSelectors.body).removeClass(pushMenuClassName.collapsed)
                .trigger($.Event(pushMenuEvent.expanded));
        }
        else {
            $(htmlSelectors.body).addClass(pushMenuClassName.open).trigger($.Event(pushMenuEvent.expanded));
        }
    };

    PushMenu.prototype.close = function () {
        localStorage.setItem(dataKey, pushMenuClosed);
        var windowWidth = $(window).width();
        if (windowWidth > this.options.collapseScreenSize) {
            $(htmlSelectors.body).addClass(pushMenuClassName.collapsed).trigger($.Event(pushMenuEvent.collapsed));
        } else {
            $(htmlSelectors.body).removeClass(pushMenuClassName.open + ' ' + pushMenuClassName.collapsed).trigger($.Event(pushMenuEvent.collapsed));
        }
    };
    // Not in use
    // PushMenu.prototype.expandOnHover = function () {
    //     $(htmlSelectors.mainSidebar).hover(function () {
    //         if ($(htmlSelectors.body).is(htmlSelectors.mini + htmlSelectors.collapsed) && $(window).width() > this.options.collapseScreenSize) {
    //             this.expand();
    //         }
    //     }.bind(this), function () {
    //         if ($(htmlSelectors.body).is(htmlSelectors.expanded)) {
    //             this.collapse();
    //         }
    //     }.bind(this));
    // };

    PushMenu.prototype.expand = function () {
        setTimeout(function () {
            $(htmlSelectors.body).removeClass(pushMenuClassName.collapsed).addClass(pushMenuClassName.expanded);
            this.open();
        }, this.options.expandTransitionDelay);
    };

    PushMenu.prototype.collapse = function () {
        setTimeout(function () {
            $(htmlSelectors.body).removeClass(pushMenuClassName.expanded).addClass(pushMenuClassName.collapsed);
        }, this.options.expandTransitionDelay);
    };

    // PushMenu Plugin Definition
    // ==========================
    function plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(dataKey);

            if (!data) {
                var options = $.extend({}, defaultConfig, $this.data(), typeof option === 'object' && option);
                $this.data(dataKey, data = new PushMenu(options));
            }

            if (option === 'toggle') data.toggle();
        });
    }

    var old = $.fn.pushMenu;

    $.fn.pushMenu = plugin;
    $.fn.pushMenu.Constructor = PushMenu;

    // No Conflict Mode
    // ================
    $.fn.pushMenu.noConflict = function () {
        $.fn.pushMenu = old;
        return this;
    };

    // Data API
    // ========
    $(document).on('click', htmlSelectors.button, function (e) {
        e.preventDefault();
        plugin.call($(this), 'toggle');
    });

    $(window).on('load', function () {
        plugin.call($(htmlSelectors.button));
        if (localStorage.getItem(dataKey) === null) {
            localStorage.setItem(dataKey, pushMenuOpen);
        }
        if (localStorage.getItem(dataKey) === pushMenuClosed) {
            plugin.call($(this), 'toggle');
        }
    });
}(jQuery);