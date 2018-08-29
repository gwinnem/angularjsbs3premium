function autoHeight() {
    var docHeight = $(document).height();
    var bodyHeight = $("body").height();
    if (!$("body").hasClass("fixed-footer")) {
        if (docHeight !== undefined && bodyHeight !== undefined) {
            var height = docHeight - bodyHeight;
            if (height > 0) {
                $("#main-footer").css({
                    marginTop: height
                });
            }
        }
    }

};

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


$().ready(function () {
    // Adding default skin if none is defined in the body.
    $.each(abSkins, function (index) {
        if ($("body").hasClass(abSkins[index])) {
            return;
        }
        $('body').addClass("skin-green-light");
    });

    autoHeight();

}).resize(function () {
    // Minimalize menu when screen is less than 768px
    if ($(this).width() < 768) {
        $("body").addClass("body-small");
    } else {
        $("body").removeClass("body-small");
    }

    autoHeight();
});


/* Fullscreen functionality
 * =========
 * Switches to fullscreen mode in browser like pushing F11
 */
function launchFullScreen(element) {
    var elem = document.body;
    if (
        document.fullScreenElement !== undefined && document.fullScreenElement === null
        || document.msFullscreenElement !== undefined && document.msFullscreenElement === null
        || document.mozFullScreen !== undefined && !document.mozFullScreen
        || document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
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
}
