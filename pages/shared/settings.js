$(document).ready(function () {
    $("#demo-set-btn").one("click", function () {
        $("#demo-nifty-settings").addClass("in");
        setupPanel();
    });


    var setupPanel = function () {
        var niftySettings = $("#demo-nifty-settings");
        niftySettings.on("click", function (e) {
            niftySettings.hasClass("in") && $(e.target).is(niftySettings) && niftySettings.removeClass("in")
        });

        // Left side button
        $("#demo-set-btn").on("click", function () {
            return niftySettings.toggleClass("in");
        });

        // X close button
        $("#demo-btn-close-settings").on("click", function () {
            $("#demo-set-btn").trigger("click");
        });
    }
});