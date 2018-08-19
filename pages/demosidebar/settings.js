/**
 * ABAdmin Demo Settings Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function () {
    'use strict';

    // initializing plugins
    $('[data-toggle="control-sidebar"]').controlSidebar();
    $('[data-toggle="push-menu"]').pushMenu();

    // Getting the plugins
    var $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
    var $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
    var $layout = $('body').data("ab.layout");

    // Reinitialize variables on load
    $(window).on('load', function () {
        $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
        $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
        $layout = $('body').data('ab.layout');
    });
    if ($("#demo-settings").hasClass("hidden")) {
        $("#demo-settings").removeClass("hidden");
    }
    /**
     * List of all the available skins
     */
    var mySkins = [
        /**
         * Black sidebar
         */
        'skin-black',
        'skin-blue',
        'skin-purple',
        'skin-green',
        'skin-red',
        'skin-yellow',
        /**
         * White sidebar
         */
        'skin-black-light',
        'skin-blue-light',
        'skin-purple-light',
        'skin-green-light',
        'skin-red-light',
        'skin-yellow-light',
        /**
         * Color sidebar
         */
        'skin-black-black',
        'skin-blue-blue',
        'skin-purple-purple',
        'skin-green-green',
        'skin-red-red',
        'skin-yellow-yellow'
    ];

    /**
     * Replaces the old skin with the new skin.
     */
    function changeSkin(cls) {
        $.each(mySkins, function (i) {
            $('body').removeClass(mySkins[i]);
        });

        $('body').addClass(cls);
        store('ab.skin', cls);
    };

    /**
     * Overriding skin if it is set in localstorage.
     */
    var currentSkin = get('ab.skin');
    if (currentSkin && $.inArray(currentSkin, mySkins)) {
        changeSkin(currentSkin);
    }

    /**
     * Toggles layout classes
     */
    function changeLayout(cls) {
        $('body').toggleClass(cls);
        if (cls === 'fixed') {
            $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
            $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
            $layout = $('body').data("ab.layout");
            //$pushMenu.expandOnHover();
            $pushMenu.close();
            // $layout is always undefined
            if ($layout !== undefined) {
                $layout.activate();
            }
            $controlSidebar.fix();
        }
    };

    //Overriding layout classes if they are set in localstorage
    var currentLayout = get('ab.layout');
    if (currentLayout) {
        changeLayout(currentLayout);
    }

    // Reinitialize variables on load
    $(window).on('load', function () {
        $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
        $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
        $layout = $('body').data('ab.layout');
    });

    var setupPanel = function () {
        var currentLayout = get("ab.layout");
        if (currentLayout === undefined || currentLayout === "") {
            store("ab.layout", "layout-normal");
        }
        var abSettings = $("#demo-settings");
        abSettings.on("click", function (e) {
            abSettings.hasClass("in") && $(e.target).is(abSettings) && abSettings.removeClass("in");
        });

        /**
         * The setting menu panel left side button.
         */
        $("#demo-set-btn").on("click", function () {
            return abSettings.toggleClass("in");
        });

        /**
         * The close button in the settings panel.
         */
        $("#demo-btn-close-settings").on("click", function () {
            return abSettings.toggleClass("in");
        });


        /**
         * Change skin  event handler.
         */
        $('[data-skin]').on('click', function (e) {
            e.preventDefault();
            changeSkin($(this).data('skin'));
        });


        /**
         * Left side menu  event handler
         */
        $("#toggle-left-sidebar").on('click', function () {
            if (this.checked) {
                $pushMenu.close();
            } else {
                $pushMenu.open();
            }
        });

        /**
         * Sidebar skin black & white  event handler
         */
        $('#toggle-right-sidebar-skin').on('click', function () {
            var $sidebar = $('.control-sidebar');
            if ($sidebar.hasClass('control-sidebar-dark')) {
                $sidebar.removeClass('control-sidebar-dark');
                $sidebar.addClass('control-sidebar-light');
                store("ab.controlSidebar", "light");
            } else {
                $sidebar.removeClass('control-sidebar-light');
                $sidebar.addClass('control-sidebar-dark');
                store("ab.controlSidebar", "dark");
            }
        });
        /**
         * Sidebar expand on hover event handler
         */
        $("#sidebar-expand-on-hover").on('click', function () {
            if (this.checked) {
                $pushMenu.expandOnHover();
                if (!$('body').hasClass('sidebar-collapse')) {
                    store("ab.sidebarExpandHover", "false");
                    $("#toggle-left-sidebar").click();
                } else {
                    store("ab.sidebarExpandHover", "false");
                }
            }
        });
        var storeLayout = get('ab.layout');
        // Checking if one the layout options are set in the index file
        if (storeLayout === 'layout-normal') {
            $("#layout-normal").attr('checked', 'checked');
        }

        if (storeLayout === 'fixed') {
            $("#layout-fixed").attr('checked', 'checked');
        }

        if (storeLayout === 'layout-boxed') {
            $("#layout-boxed").attr('checked', 'checked');
        }
    };

    // Main settings button, eventhandle and setting up the panel
    $("#demo-set-btn").one("click", function () {
        $("#demo-settings").addClass("in");
        setupPanel();
    });

    // Adding layout settings to local storage
    function changeSettings(layout, value) {
        switch (layout) {
            case "layout-normal":
                {
                    if (value) {
                        store("ab.layout", "layout-normal");
                    }
                    break;
                }
            case "fixed":
                {
                    if (value) {
                        store("ab.layout", "fixed");
                    } else {
                        store("ab.layout", "layout-normal");
                    }
                    break;
                }
            case "layout-boxed":
                {
                    if (value) {
                        store("ab.layout", "layout-boxed");
                    } else {
                        store("ab.layout", "layout-normal");
                    }
                    break;
                }
        }
        changeLayout(layout);
    };

    // Setting up event handlers for layout checkboxes
    $("#layout-normal").on('click', function () {
        changeSettings('layout-normal', this.checked);
    });

    $("#layout-fixed").on('click', function () {
        changeSettings('fixed', this.checked);
    });

    $("#layout-boxed").on('click', function () {
        changeSettings('layout-boxed', this.checked);
    });

    $("#layout-topnav").on('click', function () {
        // Adding the mega menu as an example.
        changeSettings('layout-topnav', this.checked);
    });

    /**
     * Left side user panel
     */
    $("#user-panel").on('click', function () {
        if (this.checked) {
            store("ab.userpanel", "hidden");
            if (!$("#sidebar-user-panel").hasClass("hidden")) {
                $("#sidebar-user-panel").addClass("hidden");
            }
        } else {
            store("ab.userpanel", "visible");
            if ($("#sidebar-user-panel").hasClass("hidden")) {
                $("#sidebar-user-panel").removeClass("hidden");
            }
        }
    });

    /**
     * Left side search box
     */
    $("#search-box").on('click', function () {
        if (this.checked) {
            store("ab.searchbox", "hidden");
            if (!$("#sidebar-search-form").hasClass("hidden")) {
                $("#sidebar-search-form").addClass("hidden");
            }
        } else {
            store("ab.searchbox", "visible");
            if ($("#sidebar-search-form").hasClass("hidden")) {
                $("#sidebar-search-form").removeClass("hidden");
            }
        }
    });

    /**
     * Left side sidebar-footer
     */
    $("#bottom-menu").on('click', function () {
        if (this.checked) {
            store("ab.sidebarFooter", "hidden");
            if (!$("#sidebar-footer").hasClass("hidden")) {
                $("#sidebar-footer").addClass("hidden");
            }
        } else {
            store("ab.sidebarFooter", "visible");
            if ($("#sidebar-footer").hasClass("hidden")) {
                $("#sidebar-footer").removeClass("hidden");
            }
        }
    });

    /**
     * Add the control sidebar slide option
     */
    $("#control-sidebar-slide").on('click', function () {
        if (this.checked) {
            store("ab.control.sidebar.slide", "true");
        } else {
            store("ab.control.sidebar.slide", "true");
        }
        var slide = !$controlSidebar.options.slide;
        $controlSidebar.options.slide = slide;
        if (!slide) {
            $('.control-sidebar').removeClass('control-sidebar-open');
        }
    });
    /**
     * Toggle footer fixed
     */
    $("#layout-fixedfooter").on('click', function () {
        if (this.checked) {
            store("ab.fixedfooter", "true");
            $("#main-footer").addClass("main-footer-fixed");
        } else {
            store("ab.fixedfooter", "false");
            $("#main-footer").removeClass("main-footer-fixed");
        }
    });
})();