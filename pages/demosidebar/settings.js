/**
 * ABAdmin Demo Settings Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function () {
    'use strict';

    // Possible class names in the body element.
    var className = {
        layoutNormal: "layout-normal",
        layoutFixed: "fixed",
        layoutBoxed: "layout-boxed",
        fixedFooter: "main-footer-fixed",
        visible: "visible",
        hidden: "hidden"
    };

    var storeName = {
        layout: 'ab.layout',
        pushmenu: 'ab.pushmenu',
        fixedFooter: 'ab.fixedfooter',
        skin: 'ab.skin',
        controlsidebarcolor: 'ab.controlSidebarColor',
        controlsidebar: 'ab.controlSidebar',
        controlsidebarslide: 'ab.controlSidebarSlide',
        searchbox: 'ab.searchbox',
        userpanel: 'ab.userpanel',
        sidebarFooter: 'ab.sidebarFooter'
    };

    var storeValue = {
        fixed: 'fixed',
        closed: 'closed',
        visible: 'visible',
        hidden: 'hidden',
        true: 'true',
        false: 'false',
        light: 'light',
        dark: 'dark',
        on: 'on',
        off: 'off'
    };

    // Getting the plugins
    var $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
    var $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
    var $layout = $('body').data("ab.layout");

    // Making sure demo-settins are hidden until page is loaded
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
        store(storeName.skin, cls);
    }

    /**
     * Overriding skin if it is set in localstorage.
     */
    var currentSkin = get(storeName.skin);
    if (currentSkin && $.inArray(currentSkin, mySkins)) {
        changeSkin(currentSkin);
    }

    /**
     * Toggles layout classes
     */
    function changeLayout(cls) {
        if (cls === className.layoutFixed) {
            // $pushMenu.expandOnHover();
            // $pushMenu.close();
            store(storeName.pushmenu, 'closed');
        }
    }

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

    /**
     * Setting up the settings panel.
     */
    var setupPanel = function () {
        var currentLayout = get(storeName.layout);
        if (currentLayout === '' || currentLayout === null) {
            store(storeName.layout, "layout-normal");
        }

        var abSettings = $("#demo-settings");

        /**
         * Hiding demo settings panel when clicked outside panel.
         */
        abSettings.on("click", function (e) {
            abSettings.hasClass("in") && $(e.target).is(abSettings) && abSettings.removeClass("in");
        });

        /**
         * The setting menu panel right side button event handler.
         */
        $("#demo-set-btn").on("click", function () {
            abSettings.toggleClass("in");
        });

        /**
         * The close button in the settings panel event handler.
         */
        $("#demo-btn-close-settings").on("click", function () {
            abSettings.toggleClass("in");
        });


        /**
         * Change skin event handler.
         */
        $('[data-skin]').on('click', function (e) {
            e.preventDefault();
            changeSkin($(this).data('skin'));
        });


        /**
         * Control  Sidebar skin black & white event handler
         */
        // $('#toggle-right-sidebar-skin').on('click', function () {
        //     var $sidebar = $('.control-sidebar');
        //     if ($sidebar.hasClass('control-sidebar-dark')) {
        //         $sidebar.removeClass('control-sidebar-dark');
        //         $sidebar.addClass('control-sidebar-light');
        //         store("ab.controlSidebar", "light");
        //     } else {
        //         $sidebar.removeClass('control-sidebar-light');
        //         $sidebar.addClass('control-sidebar-dark');
        //         store("ab.controlSidebar", "dark");
        //     }
        // });

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

        /**
         * Fixed footer Switch
         */
        // Initializing Fixed Footer switch
        $('#layout-fixedfooter').bootstrapToggle({
            on: 'On',
            off: 'Off',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Event handler Fixed Footer switch
        $('#layout-fixedfooter').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.fixedFooter, "true");
                $("#main-footer").addClass(className.fixedFooter);
            };
            if (!$(this).prop('checked')) {
                store(storeName.fixedFooter, "false");
                $("#main-footer").removeClass(className.fixedFooter);
            };
        });

        // Setting value on switch from store
        if (get(storeName.fixedFooter) === 'true') {
            $('#layout-fixedfooter').bootstrapToggle('on');
        } else {
            $('#layout-fixedfooter').bootstrapToggle('off');
        }

        /**
        * User Panel Switch
        */
        // Initializing switch
        $('#toggle-userpanel').bootstrapToggle({
            on: 'Visible',
            off: 'Hidden',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Default value when store is null & Setting value on switch from store
        if (get(storeName.userpanel) === null) {
            store(storeName.userpanel, storeValue.visible);
        }

        if (get(storeName.userpanel) === storeValue.visible) {
            $('#toggle-userpanel').bootstrapToggle('on');
        } else {
            $('#toggle-userpanel').bootstrapToggle('off');
        }

        // Event handler.
        $('#toggle-userpanel').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.userpanel, storeValue.visible);
                if ($("#sidebar-user-panel").hasClass(className.hidden)) {
                    $("#sidebar-user-panel").removeClass(className.hidden);
                }
            };
            if (!$(this).prop('checked')) {
                store(storeName.userpanel, storeValue.hidden);
                if (!$("#sidebar-user-panel").hasClass(className.hidden)) {
                    $("#sidebar-user-panel").addClass(className.hidden);
                }
            };
        });


        /**
        * Searchbox Switch
        */
        // Initializing switch
        $('#search-box').bootstrapToggle({
            on: 'Visible',
            off: 'Hidden',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Setting default value when store is null
        if (get(storeName.searchbox) === null) {
            store(storeName.searchbox, storeValue.visible);
        }
        // Setting value on switch from store
        if (get(storeName.searchbox) === storeValue.visible) {
            $('#search-box').bootstrapToggle('on');
        } else {
            $('#search-box').bootstrapToggle('off');
        }

        // Event handler.
        $('#search-box').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.searchbox, storeValue.visible);
                if ($("#sidebar-search-form").hasClass(className.hidden)) {
                    $("#sidebar-search-form").removeClass(className.hidden);
                }
            };
            if (!$(this).prop('checked')) {
                store(storeName.searchbox, storeValue.hidden);
                if (!$("#sidebar-search-form").hasClass(className.hidden)) {
                    $("#sidebar-search-form").addClass(className.hidden);
                }
            };
        });

        /**
         * Bottom menu Switch
         */
        // Initializing switch
        $('#bottom-menu').bootstrapToggle({
            on: 'Visible',
            off: 'Hidden',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Default value when store is null
        if (get(storeName.sidebarFooter) === null) {
            store(storeName.sidebarFooter, storeValue.visible);
        }
        // Setting value on switch from store
        if (get(storeName.sidebarFooter) === storeValue.visible) {
            $('#bottom-menu').bootstrapToggle('on');
        } else {
            $('#bottom-menu').bootstrapToggle('off');
        }

        // Event handler.
        $('#bottom-menu').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.sidebarFooter, storeValue.visible);
                if ($("#sidebar-footer").hasClass(className.hidden)) {
                    $("#sidebar-footer").removeClass(className.hidden);
                }
            };
            if (!$(this).prop('checked')) {
                store(storeName.sidebarFooter, storeValue.hidden);
                if (!$("#sidebar-footer").hasClass(className.hidden)) {
                    $("#sidebar-footer").addClass(className.hidden);
                }
            };
        });


        /**
         * Toggle Control Sidebar
         */
        // Initializing switch
        $('#control-sidebar').bootstrapToggle({
            on: 'Visible',
            off: 'Hidden',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Event handler.
        $('#control-sidebar').change(function () {
            if ($controlSidebar === undefined) {
                $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
            }
            if ($(this).prop('checked')) {
                store(storeName.controlsidebar, storeValue.visible);
                $controlSidebar.expand();
            };
            if (!$(this).prop('checked')) {
                store(storeName.controlsidebar, storeValue.hidden);
                $controlSidebar.collapse();
            };
        });

        // Setting value on switch from store
        if (get(storeName.controlsidebar) === storeValue.visible) {
            $('#control-sidebar').bootstrapToggle('on');
        } else {
            $('#control-sidebar').bootstrapToggle('off');
        }

        /**
         * Toggle Control Sidebar slide
         */
        // Initializing switch
        $('#control-sidebarslide').bootstrapToggle({
            on: 'On',
            off: 'Off',
            onstyle: 'success',
            offstyle: 'danger',
            size: 'mini',
            width: 60
        });

        // Setting value on switch from store
        if (get(storeName.controlsidebarslide) === storeValue.on) {
            $('#control-sidebarslide').bootstrapToggle('on');
        } else {
            $('#control-sidebarslide').bootstrapToggle('off');
        }

        // Event handler.
        $('#control-sidebarslide').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.controlsidebarslide, storeValue.on);
            };
            if (!$(this).prop('checked')) {
                store(storeName.controlsidebarslide, storeValue.off);
            };
        });

        /**
         * Control Sidebar Skin
         */
        // Initializing switch
        $('#toggle-right-sidebar-skin').bootstrapToggle({
            on: 'Dark',
            off: 'Light',
            onstyle: 'default',
            offstyle: 'info',
            size: 'mini',
            width: 60
        });

        //Getting default values and Setting value on switch from store
        if (get(storeName.controlsidebarcolor) === null) {
            if ($('#control-sidebar-panel').hasClass('control-sidebar-light')) {
                store(storeName.controlsidebarcolor, storeValue.light);
            }
            if ($('#control-sidebar-panel').hasClass('control-sidebar-dark')) {
                store(storeName.controlsidebarcolor, storeValue.dark);
            }
        }

        if (get(storeName.controlsidebarcolor) === storeValue.dark) {
            $('#toggle-right-sidebar-skin').bootstrapToggle('on');
        } else {
            $('#toggle-right-sidebar-skin').bootstrapToggle('off');
        }


        // Event handler.
        $('#toggle-right-sidebar-skin').change(function () {
            if ($(this).prop('checked')) {
                store(storeName.controlsidebarcolor, storeValue.dark);
                if ($('#control-sidebar-panel').hasClass('control-sidebar-light')) {
                    $('#control-sidebar-panel').removeClass('control-sidebar-light')
                }
                if (!$('#control-sidebar-panel').hasClass('control-sidebar-dark')) {
                    $('#control-sidebar-panel').addClass('control-sidebar-dark')
                }
            };
            if (!$(this).prop('checked')) {
                store(storeName.controlsidebarcolor, storeValue.light);
                if ($('#control-sidebar-panel').hasClass('control-sidebar-dark')) {
                    $('#control-sidebar-panel').removeClass('control-sidebar-dark')
                }
                if (!$('#control-sidebar-panel').hasClass('control-sidebar-light')) {
                    $('#control-sidebar-panel').addClass('control-sidebar-light')
                }
            };
        });

    };

    // Main settings button, eventhandler and setting up the panel
    $("#demo-set-btn").one("click", function () {
        $("#demo-settings").addClass("in");
        setupPanel();
    });

    // Reinitialize variables when document is ready and loaded.
    $(document).ready(function () {
        $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
        $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
        $layout = $('body').data("ab.layout");
        // Updating push menu state -- NOT WORKING
        if (get(storeName.pushmenu) === storeValue.closed) {
            if ($pushMenu === undefined) {
                $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
            }
            $pushMenu.collapse();
        }

        var storeLayout = get(storeName.layout);
        var storePushMenu = get(storeName.pushmenu);

        // Setting pushmenu
        if (storeLayout === storeValue.fixed) {
            $pushMenu.collapse();
            store(storeName.pushmenu, storeValue.closed);
        } else if (storePushMenu === storeValue.closed && storeLayout !== storeValue.fixed) {
            $pushMenu.collapse();
        }
        changeLayout(storeLayout);
    });

})();