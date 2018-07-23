﻿/**
 * IOS style On Off Switch component.
 * @author Geirr Winnem
 * @copywright 2018- Geirr Winnem. All Rights Reserved
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Styles can be found in the on-off-switch.less file.
 */
(function () {
    "use strict";

    angular.module("abIosToggleSwitch", [])
        .directive("iosToggleSwitch", function () {
            return {
                restrict: "EA",
                replace: true,
                transclude: true,
                template: function (element, attrs) {
                    var html = '';
                    html += '<span';
                    html += ' class="ios-switch' + (attrs.class ? ' ' + attrs.class : '') + '"';
                    html += attrs.ngModel ? ' ng-click="' + attrs.disabled + ' ? ' + attrs.ngModel + ' : ' + attrs.ngModel + '=!' + attrs.ngModel + (attrs.ngChange ? '; ' + attrs.ngChange + '()"' : '"') : '';
                    html += ' ng-class="{ checked:' + attrs.ngModel + ', disabled:' + attrs.disabled + ' }"';
                    html += '>';
                    html += '<small></small>';
                    html += '<input type="checkbox"';
                    html += attrs.id ? ' id="' + attrs.id + '"' : '';
                    html += attrs.name ? ' name="' + attrs.name + '"' : '';
                    html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
                    html += ' style="display:none" />';
                    html += '<span class="switch-text">'; /*adding new container for switch text*/
                    html += attrs.on ? '<span class="on">' + attrs.on + '</span>' : ''; /*switch text on value set by user in directive html markup*/
                    html += attrs.off ? '<span class="off">' + attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
                    html += '</span>';
                    return html;
                }
            }
        });
})();