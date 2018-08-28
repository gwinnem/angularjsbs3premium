/* jQuery pushMenu() plugin.
 * ==========
 * Adds the push menu functionality to the sidebar.
 *
 * @usage: $('.btn').pushMenu(options)
 *          or add [data-toggle="push-menu"] to any button
 *          Pass any option as data-option="value"
 */

+function ($) {
    'use strict';

    var dataKey = 'ab.pushMenu';
    var pushMenuOpen = 'open';
    var pushMenuClosed = 'closed';

    var defaults = {
        collapseScreenSize: 767,
        expandOnHover: false,
        expandTransitionDelay: 100
    };

    var htmlSelector = {
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

    var className = {
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

    // pushMenu Class Definition
    // =========================
    var pushMenu = function (options) {
        this.options = options;
        this.init();
        this.name = "pushMenu";
    };

    pushMenu.prototype = {
        init: function () {
            if (this.options.expandOnHover || $(htmlSelector.body).is(htmlSelector.mini + htmlSelector.layoutFixed)) {
                this.expandOnHover();
                $(htmlSelector.body).addClass(className.expandFeature);
            }

            $(htmlSelector.contentWrapper).click(function () {
                // Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= this.options.collapseScreenSize && $(htmlSelector.body).hasClass(className.open)) {
                    this.close();
                }
            }.bind(this));
        },
        toggle: function () {
            var windowWidth = $(window).width();
            var isOpen = !$(htmlSelector.body).hasClass(className.collapsed);

            if (windowWidth <= this.options.collapseScreenSize) {
                isOpen = $(htmlSelector.body).hasClass(className.open);
            }
            // Hiding sidebar bottom menu if it exists
            if (!isOpen) {
                $(htmlSelector.sidebarFooter).removeClass(className.hidden);
                this.open();
            } else {
                $(htmlSelector.sidebarFooter).addClass(className.hidden);
                this.close();
            }
        },
        open: function () {
            localStorage.setItem(dataKey, pushMenuOpen);
            var windowWidth = $(window).width();

            if (windowWidth > this.options.collapseScreenSize) {
                $(htmlSelector.body).removeClass(className.collapsed)
                    .trigger($.Event(pushMenuEvent.expanded));
            }
            else {
                $(htmlSelector.body).addClass(className.open).trigger($.Event(pushMenuEvent.expanded));
            }
        },
        close: function () {
            localStorage.setItem(dataKey, pushMenuClosed);
            var windowWidth = $(window).width();

            if (windowWidth > this.options.collapseScreenSize) {
                $(htmlSelector.body)
                    .addClass(className.collapsed)
                    .trigger($.Event(pushMenuEvent.collapsed));
            } else {
                $(htmlSelector.body)
                    .removeClass(className.open + ' ' + className.collapsed)
                    .trigger($.Event(pushMenuEvent.collapsed));
            }
        },
        expandOnHover: function () {
            $(htmlSelector.mainSidebar).hover(function () {
                if ($(htmlSelector.body)
                    .is(htmlSelector.mini + htmlSelector.collapsed) && $(window).width() > this.options.collapseScreenSize) {
                    this.expand();
                }
            }.bind(this), function () {
                if ($(htmlSelector.body).is(htmlSelector.expanded)) {
                    this.collapse();
                }
            }.bind(this));
        },
        expand: function () {
            setTimeout(function () {
                $(htmlSelector.body)
                    .removeClass(className.collapsed)
                    .addClass(className.expanded);
                this.open();
            }, this.options.expandTransitionDelay);
        },
        collapse: function () {
            setTimeout(function () {
                $(htmlSelector.body)
                    .removeClass(className.expanded)
                    .addClass(className.collapsed);
            }, this.options.expandTransitionDelay);
        }
    }

    // plugin constructor
    // ==========================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(dataKey);

            if (!data) {
                var options = $.extend({}, defaults, $this.data(), typeof option === 'object' && option);
                $this.data(dataKey, data = new pushMenu(options));
            }

            if (option === 'toggle') data.toggle();
        });
    }

    var old = $.fn.pushMenu;

    $.fn.pushMenu = Plugin;
    $.fn.pushMenu.Constructor = pushMenu;

    // No Conflict Mode
    // ================
    $.fn.pushMenu.noConflict = function () {
        $.fn.pushMenu = old;
        return this;
    };

    // Data API
    // ========
    $(document).on('click', htmlSelector.button, function (e) {
        e.preventDefault();
        Plugin.call($(this), 'toggle');
    });

    // There should only be one button where the plugin is registrated
    $(window).on('load', function () {
        Plugin.call($(htmlSelector.button));
    });
}(jQuery);