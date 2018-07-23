/* BoxRefresh()
 * =========
 * Adds AJAX content control to a box.
 *
 * @Usage: $('#my-box').boxRefresh(options)
 *         or add [data-widget="box-refresh"] to the box element
 *         Pass any option as data-option="value"
 */
+function ($) {
    'use strict';

    var DataKey = 'lte.boxrefresh';

    var Default = {
        source: '',
        params: {},
        trigger: '.refresh-btn',
        content: '.box-body',
        loadInContent: true,
        responseType: '',
        overlayTemplate: '<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>',
        onLoadStart: function () {
        },
        onLoadDone: function (response) {
            return response;
        }
    };

    var Selector = {
        data: '[data-widget="box-refresh"]'
    };

    // BoxRefresh Class Definition
    // =========================
    var BoxRefresh = function (element, options) {
        this.element = element;
        this.options = options;
        this.$overlay = $(options.overlay);

        if (options.source === '') {
            throw new Error('Source url was not defined. Please specify a url in your BoxRefresh source option.');
        }

        this._setUpListeners();
        this.load();
    };

    BoxRefresh.prototype.load = function () {
        this._addOverlay();
        this.options.onLoadStart.call($(this));

        $.get(this.options.source, this.options.params, function (response) {
            if (this.options.loadInContent) {
                $(this.options.content).html(response);
            }
            this.options.onLoadDone.call($(this), response);
            this._removeOverlay();
        }.bind(this), this.options.responseType !== '' && this.options.responseType);
    };

    // Private

    BoxRefresh.prototype._setUpListeners = function () {
        $(this.element).on('click', Selector.trigger, function (event) {
            if (event) event.preventDefault();
            this.load();
        }.bind(this));
    };

    BoxRefresh.prototype._addOverlay = function () {
        $(this.element).append(this.$overlay);
    };

    BoxRefresh.prototype._removeOverlay = function () {
        $(this.element).remove(this.$overlay);
    };

    // Plugin Definition
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(DataKey);

            if (!data) {
                var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                $this.data(DataKey, (data = new BoxRefresh($this, options)));
            }

            if (typeof data == 'string') {
                if (typeof data[option] == 'undefined') {
                    throw new Error('No method named ' + option);
                }
                data[option]();
            }
        });
    }

    var old = $.fn.boxRefresh;

    $.fn.boxRefresh = Plugin;
    $.fn.boxRefresh.Constructor = BoxRefresh;

    // No Conflict Mode
    // ================
    $.fn.boxRefresh.noConflict = function () {
        $.fn.boxRefresh = old;
        return this;
    };

    // BoxRefresh Data API
    // =================
    $(window).on('load', function () {
        $(Selector.data).each(function () {
            Plugin.call($(this));
        });
    });

}(jQuery);


/* BoxWidget()
 * ======
 * Adds box widget functions to boxes.
 *
 * @Usage: $('.my-box').boxWidget(options)
 *         This plugin auto activates on any element using the `.box` class
 *         Pass any option as data-option="value"
 */
+function ($) {
    'use strict';

    var DataKey = 'ab.boxwidget';

    var Default = {
        animationSpeed: 500,
        collapseTrigger: '[data-widget="collapse"]',
        removeTrigger: '[data-widget="remove"]',
        fullscreenTrigger: '[data-widget="fullscreen"]',
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        removeIcon: 'fa-times',
        fullscreenIcon: 'fa-expand',
        normalscreenIcon: 'fa-compress'
    };

    var Selector = {
        data: '.box',
        collapsed: '.collapsed-box',
        fullscreen: 'fullscreen-box',
        header: '.box-header',
        body: '.box-body',
        footer: '.box-footer',
        tools: '.box-tools'
    };

    var ClassName = {
        collapsed: 'collapsed-box'
    };

    var Event = {
        collapsed: 'collapsed.boxwidget',
        expanded: 'expanded.boxwidget',
        removed: 'removed.boxwidget',
        fullscreen: 'fullscreen-boxwidget',
        normalscreen: 'normalscreen-boxwidget'
    };

    // BoxWidget Class Definition
    // =====================
    var BoxWidget = function (element, options) {
        this.element = element;
        this.options = options;
        this._setUpListeners();
    };

    BoxWidget.prototype.toggle = function () {
        var isOpen = !$(this.element).is(Selector.collapsed);

        if (isOpen) {
            this.collapse();
        } else {
            this.expand();
        }
    };

    BoxWidget.prototype.expand = function () {
        var expandedEvent = $.Event(Event.expanded);
        var collapseIcon = this.options.collapseIcon;
        var expandIcon = this.options.expandIcon;

        $(this.element).removeClass(ClassName.collapsed);

        $(this.element)
          .children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
          .children(Selector.tools)
          .find('.' + expandIcon)
          .removeClass(expandIcon)
          .addClass(collapseIcon);

        $(this.element).children(Selector.body + ', ' + Selector.footer)
          .slideDown(this.options.animationSpeed, function () {
              $(this.element).trigger(expandedEvent);
          }.bind(this));
    };

    BoxWidget.prototype.collapse = function () {
        var collapsedEvent = $.Event(Event.collapsed);
        var collapseIcon = this.options.collapseIcon;
        var expandIcon = this.options.expandIcon;

        $(this.element)
          .children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
          .children(Selector.tools)
          .find('.' + collapseIcon)
          .removeClass(collapseIcon)
          .addClass(expandIcon);

        $(this.element).children(Selector.body + ', ' + Selector.footer)
          .slideUp(this.options.animationSpeed, function () {
              $(this.element).addClass(ClassName.collapsed);
              $(this.element).trigger(collapsedEvent);
          }.bind(this));
    };

    BoxWidget.prototype.remove = function () {
        var removedEvent = $.Event(Event.removed);
        // in fullscreen mode we are adding the correct classes
        if ($(this.element).hasClass(Selector.fullscreen)) {
            this.toggleScreen();
        }
        $(this.element).slideUp(this.options.animationSpeed, function () {
            $(this.element).trigger(removedEvent);
            $(this.element).remove();
        }.bind(this));
    };

    BoxWidget.prototype.toggleScreen = function () {
        var header = $("header");
        var sidebar = $("aside");
        var isFull = $(this.element).hasClass(Selector.fullscreen);
        if (isFull) {
            header.removeClass("display-none");
            sidebar.removeClass("display-none");
            this.normalscreen();
        } else {
            header.addClass("display-none");
            sidebar.addClass("display-none");
            // Expand box if collapsed first.
            if ($(this.element).is(Selector.collapsed)) {
                this.expand();
            }
            this.fullscreen();
        }
    };
    BoxWidget.prototype.normalscreen = function () {
        var normalscreenEvent = $.Event(Event.normalscreen);
        var elem = (this.element);
        // Raise event
        elem.trigger(normalscreenEvent);

        // Toogle icons
        var fullscreenIcon = this.options.fullscreenIcon;
        var normalscreenIcon = this.options.normalscreenIcon;

        elem.children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
            .children(Selector.tools)
            .find('.' + fullscreenIcon)
            .removeClass(fullscreenIcon)
            .addClass(normalscreenIcon);

        // Remove fullscreen class
        elem.removeClass(Selector.fullscreen);
    };
    BoxWidget.prototype.fullscreen = function () {
        var fullscreenEvent = $.Event(Event.fullscreen);
        var elem = (this.element);
        // Raise event
        elem.trigger(fullscreenEvent);
        // Toggle icons
        var fullscreenIcon = this.options.fullscreenIcon;
        var normalscreenIcon = this.options.normalscreenIcon;
        elem.children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
            .children(Selector.tools)
            .find('.' + fullscreenIcon)
            .removeClass(fullscreenIcon)
            .addClass(normalscreenIcon);
        // Add fullscreen class
        elem.addClass(Selector.fullscreen);
    };

    BoxWidget.prototype._setUpListeners = function () {

        var that = this;
        // Epxand - Collapse
        $(this.element).on('click', this.options.collapseTrigger, function (event) {
            if (event) event.preventDefault();
            that.toggle($(this));
            return false;
        });
        // Fullscreen
        $(this.element).on('click', this.options.fullscreenTrigger, function (event) {
            if (event) event.preventDefault();
            that.toggleScreen(this);
            return false;
        });
        // Remove
        $(this.element).on('click', this.options.removeTrigger, function (event) {
            if (event) event.preventDefault();
            that.remove($(this));
            return false;
        });
    };

    // Plugin Definition
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(DataKey);

            if (!data) {
                var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                $this.data(DataKey, (data = new BoxWidget($this, options)));
            }

            if (typeof option == 'string') {
                if (typeof data[option] == 'undefined') {
                    throw new Error('No method named ' + option);
                }
                data[option]();
            }
        });
    }

    var old = $.fn.boxWidget;

    $.fn.boxWidget = Plugin;
    $.fn.boxWidget.Constructor = BoxWidget;

    // No Conflict Mode
    // ================
    $.fn.boxWidget.noConflict = function () {
        $.fn.boxWidget = old;
        return this;
    };

    // BoxWidget Data API
    // ==================
    //$(window).on('load', function () {
    //    $(Selector.data).each(function () {
    //        Plugin.call($(this));
    //    });
    //});
}(jQuery);