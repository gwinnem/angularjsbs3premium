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
