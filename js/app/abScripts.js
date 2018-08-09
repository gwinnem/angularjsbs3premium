function autoHeight() {
    var docHeight = $(document).height();
    var bodyHeight = $("body").height();
    if(!$("body").hasClass("fixed-footer")){
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
/**
 * List of all the available skins
 */
var abSkins = [
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
$().ready(function () {
    // Adding default skin if none is defined in the body.
    $.each(abSkins, function (index) {
        if ($("body").hasClass(abSkins[index])) {
            return;
        }
        $('body').addClass("skin-black-light");
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