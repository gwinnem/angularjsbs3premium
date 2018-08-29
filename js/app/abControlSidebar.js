/* controlSidebar()
 * ===============
 * Toggles the state of the control sidebar
 *
 * @Usage: $('#control-sidebar-trigger').controlSidebar(options)
 *         or add [data-toggle="control-sidebar"] to the trigger
 *         Pass any option as data-option="value"
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {
    "use strict";

    // Local storage name.
    var dataKey = "ab.controlSidebar";

    var defaults = {
        slide: true,                // Slideover or push content when opening.
        useLocalstorage: true       // Saving state in local storage.
    };

    var htmlSelector = {
        sidebar: ".control-sidebar",
        data: '[data-toggle="control-sidebar"]',
        open: ".control-sidebar-open",
        bg: ".control-sidebar-bg",
        wrapper: ".wrapper",
        boxed: ".layout-boxed"
    };

    var className = {
        open: "control-sidebar-open",
        slideOpen: "control-sidebar-slide-open",
        fixed: "fixed",
        openOnLoad: "controlsidebar-open"
    };

    // Events dispatched or listening to by the plugin.
    var pluginEvent = {
        // Dispatched events
        collapsed: "controlSidebar.collapsed",
        expanded: "controlSidebar.expanded",
        // Listening events
        slideopen: "controlSidebar.slide.open",
        open: "controlSidebar.open",
        close: "controlSidebar.close"
    };

    // controlSidebar Class Definition
    // ===============================
    var controlSidebar = function (element, options) {
        this.element = element;
        this.options = options;
        this.init();
    };

    controlSidebar.prototype = {
        init: function () {
            // Add click listener if the element hasn't been
            // initialized using the data API
            if (!$(this.element).is(htmlSelector.data)) {
                $(this).on('click', this.toggle);
            }

            this.fix();
            $(window).resize(function () {
                this.fix();
            }.bind(this));
        },
        fix: function () {
            if ($('body').hasClass(htmlSelector.boxed)) {
                bg.css({
                    position: 'absolute',
                    height: $(hmtlSelector.wrapper).height()
                });
            }
        },
        collapse: function () {
            this.fix();
            if (this.options.useLocalstorage) {
                store('dataKey', pluginEvent.close);
            }
            $("body, " + htmlSelector.sidebar).removeClass(className.open);
            $(this.element).trigger($.Event(pluginEvent.collapsed));
        },
        expand: function () {
            this.fix();
            if (this.options.useLocalstorage) {
                store('dataKey', pluginEvent.open);
            }

            if (!this.options.slide) {
                $('body').addClass(className.open);
            } else {
                $(htmlSelector.sidebar).addClass(className.open);
            }

            $(this.element).trigger($.Event(pluginEvent.expanded));
        },
        expandslide: function () {
            this.options.slide = false;
            this.expand();
        },
        toggle: function (event) {
            if (event) {
                event.preventDefault();
            }
            if (!$(htmlSelector.sidebar).is(htmlSelector.open) && !$('body').is(htmlSelector.open)) {
                if ($('body').hasClass(className.slideOpen)) {
                    this.expandslide();
                } else {
                    this.expand();
                }

            } else {
                this.collapse();
            }
        }
    }


    // Plugin Constructor
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(dataKey);

            if (!data) {
                var options = $.extend({}, defaults, $this.data(), typeof option == "object" && option);
                $this.data(dataKey, (data = new controlSidebar($this, options)));
            }

            if (typeof option == 'string') data.toggle();
        });
    }

    var old = $.fn.controlSidebar;

    $.fn.controlSidebar = Plugin;
    $.fn.controlSidebar.Constructor = controlSidebar;

    // No Conflict Mode
    // ================
    $.fn.controlSidebar.noConflict = function () {
        $.fn.controlSidebar = old;
        return this;
    };

    // Data API
    // =======================
    $(document).on(pluginEvent.slideopen, function (event) {
        if (event) {
            event.preventDefault();
        }
        Plugin.call($(this), 'expandslide');
    });
    $(document).on(pluginEvent.open, function (event) {
        if (event) {
            event.preventDefault();
        }
        Plugin.call($(this), 'expand');
    });
    $(document).on(pluginEvent.close, function (event) {
        if (event) {
            event.preventDefault();
        }
        Plugin.call($(this), 'close');
    });

    $(document).on('click', htmlSelector.data, function (event) {
        if (event) {
            event.preventDefault();
        }
        Plugin.call($(this), 'toggle');
    });


    // Checking if we should open the controlsidebar upon load.
    $(document).ready(function () {
        if ($('body').hasClass(className.openOnLoad)) {
            $('body').addClass(className.open);
        }

        // Adding click event on wrapper to auto close controlsidebar
        $(htmlSelector.wrapper).on('click', function (event) {
            if ($('body').hasClass(className.open)) {
                Plugin.call($(this), 'toggle');
            }
        });
    });
}(jQuery, window, document));