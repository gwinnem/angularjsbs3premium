/**
 * 
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary creates the issue formatted text
 */
(function () {
    "use strict";
    angular.module("abIssueFilter", [[]])
        .filter("issueFormat", function () {
            return function (issue) {
                var zeroPad = 2;
                return Array(+(zeroPad > 0 && zeroPad)).join("0") + issue;
            };
        });
})();