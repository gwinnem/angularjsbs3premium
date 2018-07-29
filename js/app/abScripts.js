/* Adjusting height.
 */
function autoHeight() {
    var docHeight = $(document).height();
    var bodyHeight = $("body").height();
    if (docHeight !== undefined && bodyHeight !== undefined) {
        var height = docHeight - bodyHeight;
        if (height > 0) {
            $("#main-footer").css({
                marginTop: height
            });
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
   // autoHeight();
}).resize(function () {
    // Minimalize menu when screen is less than 768px
    if ($(this).width() < 768) {
        $("body").addClass("body-small");
    } else {
        $("body").removeClass("body-small");
    }

    autoHeight();
});
