/**
 * abBootstraspFormCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Bootstrap form controller
 */
(function () {
    "use strict";
    angular.module("abBootstrapformModule", [[]])
        .controller("BootstrapformController", ["$notification", "config",
            function ($notification, config) {
                $('#characterLeft').text('140 characters left');
                $('#message').keydown(function () {
                    var max = 140;
                    var len = $(this).val().length;
                    if (len >= max) {
                        $('#characterLeft').text('You have reached the limit');
                        $('#characterLeft').addClass('red');
                        $('#btnSubmit').addClass('disabled');
                    }
                    else {
                        var ch = max - len;
                        $('#characterLeft').text(ch + ' characters left');
                        $('#btnSubmit').removeClass('disabled');
                        $('#characterLeft').removeClass('red');
                    }
                });
                if (config.debug) {
                    $notification.success("Forms loaded", "Bootstrap Forms", config.notificationDelay);
                }
            }]);
})();
