(function () {
    'use strict';

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== 'undefined') {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
        return 1;
    };

    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    };

    /**
     * Toggles layout classes
     *
     * @param String cls the layout class to toggle
     * @returns void
     */
    function changeLayout(cls) {
        debugger;
        $('body').toggleClass(cls);
        $layout.fixSidebar();
        if ($('body').hasClass('layout-fixed') && cls === 'layout-fixed') {
            $pushMenu.expandOnHover();
            $layout.activate();
        }
        $controlSidebar.fix();
    };

    /**
     * List of all the available skins
     */
    var mySkins = [
        'skin-blue',
        'skin-black',
        'skin-red',
        'skin-yellow',
        'skin-purple',
        'skin-green',
        'skin-blue-light',
        'skin-black-light',
        'skin-red-light',
        'skin-yellow-light',
        'skin-purple-light',
        'skin-green-light'
    ];

    /**
     * Replaces the old skin with the new skin
     * @param String cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function changeSkin(cls) {
        $.each(mySkins, function (i) {
            $('body').removeClass(mySkins[i]);
        });

        $('body').addClass(cls);
        store('ab.skin', cls);
        return false;
    };

    /**
     * Get access to plugins
     */

    // initializing plugins
    $('[data-toggle="control-sidebar"]').controlSidebar();
    $('[data-toggle="push-menu"]').pushMenu();


    // Getting the plugins
    var $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
    var $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
    var $layout = $('body').data('ab.layout');

    // Reinitialize variables on load
    $(window).on('load', function () {
        $pushMenu = $('[data-toggle="push-menu"]').data('ab.pushmenu');
        $controlSidebar = $('[data-toggle="control-sidebar"]').data('ab.controlsidebar');
        $layout = $('body').data('ab.layout');
    });

    var setupPanel = function () {
        var abSettings = $("#demo-settings");
        abSettings.on("click", function (e) {
            abSettings.hasClass("in") && $(e.target).is(abSettings) && abSettings.removeClass("in");
        });

        // Left side button
        $("#demo-set-btn").on("click", function () {
            return abSettings.toggleClass("in");
        });

        // X close button
        $("#demo-btn-close-settings").on("click", function () {
            return abSettings.toggleClass("in");
        });

        //Checking if the skin value is set in localstorage
        var currentSkin = get('ab.skin');
        if (currentSkin && $.inArray(currentSkin, mySkins)) {
            changeSkin(currentSkin);
        }

        // Add the change skin listener
        $('[data-skin]').on('click', function (e) {
            e.preventDefault();
            changeSkin($(this).data('skin'));
        });

        // Add the layout manager
        $('[data-layout]').on('click', function () {
            changeLayout($(this).data('layout'));
        });
    }
    // Main settings button
    $("#demo-set-btn").one("click", function () {
        $("#demo-settings").addClass("in");
        setupPanel();
    });

    // Changing layout settings
    function changeSettings(layout) {
        // alert(layout);
        switch (layout) {
            case "layout-normal":
                {
                    store("ab.layout","layout-normal");
                    break;
                }
                case "layout-fixed":
                {
                    store("ab.layout","layout-fixed");
                    break;
                }
                case "layout-boxed":
                {
                    store("ab.layout","layout-boxed");
                    break;
                }
        }
    };

    // Setting up layout checkboxes
    $("#layout-normal").on('click', function (event) {
        if (this.checked) {

        }
        changeSettings('layout-normal');
    });
    $("#layout-fixed").on('click', function (event) {

        changeSettings('layout-fixed')
    });
    $("#layout-boxed").on('click', function (event) {

        changeSettings('layout-boxed')
    });


    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function setup() {
        // Add the control sidebar
        $('[data-controlsidebar]').on('click', function () {
            changeLayout($(this).data('controlsidebar'));
            var slide = !$controlSidebar.options.slide;
            $controlSidebar.options.slide = slide;
            if (!slide) {
                $('.control-sidebar').removeClass('control-sidebar-open');
            }
        });

        $('[data-sidebarskin="toggle"]').on('click', function () {
            var $sidebar = $('.control-sidebar');
            if ($sidebar.hasClass('control-sidebar-dark')) {
                $sidebar.removeClass('control-sidebar-dark');
                $sidebar.addClass('control-sidebar-light');
            } else {
                $sidebar.removeClass('control-sidebar-light');
                $sidebar.addClass('control-sidebar-dark');
            }
        });

        $('[data-enable="expandOnHover"]').on('click', function () {
            // TODO refactor
            //$(this).attr('disabled', true);
            $pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $('[data-layout="sidebar-collapse"]').click();
        });

        // Checking if one the options are set in the index file
        if ($('body').hasClass('layout-fixed')) {
            $("#layout-fixed").attr('checked', 'checked');
            $("#laoyout-normal").attr('disabled', 'disabled');
            $("#laoyout-boxed").attr('disabled', 'disabled');
        }

        if ($('body').hasClass('layout-boxed')) {
            $("#layout-boxed").attr('checked', 'checked');
            $("#laoyout-normal").attr('disabled', 'disabled');
            $("#laoyout-fixed").attr('disabled', 'disabled');
        }
        if ($('body').hasClass('layout-normal')) {
            $("#laoyout-normal").attr('checked', 'checked');
            $("#laoyout-fixed").attr('disabled', 'disabled');
            $("#laoyout-boxed").attr('disabled', 'disabled');
        }

        if ($('body').hasClass('sidebar-collapse')) {
            $('[data-layout="sidebar-collapse"]').attr('checked', 'checked');
        }
    };

    setup();

})();