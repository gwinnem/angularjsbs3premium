/* Tree()
 * ======
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+ function ($) {
    'use strict';

    var DataKey = 'ab.tree';

    var Default = {
        animationSpeed: 500,
        accordion: true,
        followLink: false,
        trigger: '.treeview a',
        triggertoplevel: '.tree-menu a'
    };

    var Selector = {
        tree: '.tree',
        treeMenu: '.tree-menu',
        treeview: '.treeview',
        treeviewMenu: '.treeview-menu',
        open: '.menu-open, .active',
        li: 'li',
        data: '[data-widget="tree"]',
        active: '.active',
        sidebarMenu: '.sidebar-menu'
    };

    var ClassName = {
        open: 'menu-open',
        tree: 'tree',
        active: 'active',
        sidebarMenu: 'sidebar-menu'
    };

    var Event = {
        collapsed: 'collapsed.tree',
        expanded: 'expanded.tree'
    };

    // Tree Class Definition
    // =====================
    var Tree = function (element, options) {
        this.element = element;
        this.options = options;

        $(this.element).addClass(ClassName.tree);

        $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

        this._setUpListeners();
    };

    Tree.prototype.toggletoplevel = function (element, event) {
        // Do nothing if the active menu item is clicked
        if ($(event.currentTarget.parentElement).hasClass(ClassName.active)) {
            return;
        };

        // Removing all open classes from treeview menu
        $(Selector.treeviewMenu + Selector.open).each(function () {
            $(this).removeClass(ClassName.active);
        });

        // adding active class to the selected top level menu item
        $(element.context.parentElement).addClass(ClassName.active);

        //$(Selector.treeMenu + " > " + Selector.open).find(Selector.open + ' > ' + Selector.treeview).slideUp();
        //$(Selector.treeviewMenu + Selector.open).slideUp();
        // var that = $(Selector.open + ' > ' + Selector.treeviewMenu);
        // $(Selector.open + ' > ' + Selector.treeviewMenu).each(function () {
        //     $(this).removeClass(ClassName.open);
        //     //$(selector).slideUp(speed,easing,callback)
        // });
        return;
    };

    Tree.prototype.toggle = function (link, event) {
        var treeviewMenu = link.next(Selector.treeviewMenu);
        var parentLi = link.parent();
        var isOpen = parentLi.hasClass(ClassName.open);

        if (!parentLi.is(Selector.treeview)) {
            // Removing all active classes before adding it to the element clicked
            $(Selector.sidebarMenu).find(Selector.active)
                .each(function () {
                    $(this).removeClass(ClassName.active);
                });
            parentLi.addClass(ClassName.active);
            return;
        }

        if (!this.options.followLink || link.attr('href') === '#') {
            event.preventDefault();
        }

        if (isOpen) {
            this.collapse(treeviewMenu, parentLi);
        } else {
            this.expand(treeviewMenu, parentLi);
        }
    };

    Tree.prototype.expand = function (tree, parent) {
        var expandedEvent = $.Event(Event.expanded);

        if (this.options.accordion) {
            var openMenuLi = parent.siblings(Selector.open);
            var openTree = openMenuLi.children(Selector.treeviewMenu);
            this.collapse(openTree, openMenuLi);
        }

        parent.addClass(ClassName.open);
        tree.slideDown(this.options.animationSpeed, function () {
            $(this.element).trigger(expandedEvent);
        }.bind(this));
    };

    Tree.prototype.collapse = function (tree, parentLi) {
        var collapsedEvent = $.Event(Event.collapsed);

        tree.find(Selector.open).removeClass(ClassName.open);
        parentLi.removeClass(ClassName.open);
        tree.slideUp(this.options.animationSpeed, function () {
            tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
            $(this.element).trigger(collapsedEvent);
        }.bind(this));
    };

    // Private

    Tree.prototype._setUpListeners = function () {
        var that = this;

        $(this.element).on('click', this.options.trigger, function (event) {
            that.toggle($(this), event);
        });

        $(this.element).on('click', this.options.triggertoplevel, function (event) {
            that.toggletoplevel($(this), event);
        });
    };

    // Plugin Definition
    // =================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(DataKey);

            if (!data) {
                var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                $this.data(DataKey, new Tree($this, options));
            }
        });
    }

    var old = $.fn.tree;

    $.fn.tree = Plugin;
    $.fn.tree.Constructor = Tree;

    // No Conflict Mode
    // ================
    $.fn.tree.noConflict = function () {
        $.fn.tree = old;
        return this;
    };

    // Tree Data API
    // =============
    $(window).on('load', function () {
        $(Selector.data).each(function () {
            Plugin.call($(this));
        });
    });

}(jQuery);


//     Tree.prototype.toggletoplevel = function (element, event) {
//         // Do nothing if the active menu item is clicked
//         if ($(event.currentTarget.parentElement).hasClass(ClassName.active)) {
//             return;
//         };

//         // Removing all open classes from treeview menu
//         $(Selector.treeviewMenu + Selector.open).each(function () {
//             $(this).removeClass(ClassName.active);
//         });

//         // adding active class to the selected top level menu item
//         $(element.context.parentElement).addClass(ClassName.active);

//         //$(Selector.treeMenu + " > " + Selector.open).find(Selector.open + ' > ' + Selector.treeview).slideUp();
//         //$(Selector.treeviewMenu + Selector.open).slideUp();
//         // var that = $(Selector.open + ' > ' + Selector.treeviewMenu);
//         // $(Selector.open + ' > ' + Selector.treeviewMenu).each(function () {
//         //     $(this).removeClass(ClassName.open);
//         //     //$(selector).slideUp(speed,easing,callback)
//         // });
//         return;
//     };

//     Tree.prototype.toggle = function (link, event) {
//         var treeviewMenu = link.next(Selector.treeviewMenu);
//         var parentLi = link.parent();
//         var isOpen = parentLi.hasClass(ClassName.open);

//         if (!parentLi.is(Selector.treeview)) {
//             // Removing all active classes before adding it to the element clicked
//             $(Selector.sidebarMenu).find(Selector.active).each(function () {
//                     $(this).removeClass(ClassName.active);
//                 });
//             parentLi.addClass(ClassName.active);
//             return;
//         }

//         if (link.attr('href') === '#') {
//             event.preventDefault();
//         }

//         if (isOpen) {
//             this.collapse(treeviewMenu, parentLi);
//         } else {
//             this.expand(treeviewMenu, parentLi);
//         }
//     };

//     Tree.prototype.expand = function (tree, parent) {
//         var expandedEvent = $.Event(Event.expanded);

//         if (this.options.accordion) {
//             var openMenuLi = parent.siblings(Selector.open);
//             var openTree = openMenuLi.children(Selector.treeviewMenu);
//             this.collapse(openTree, openMenuLi);
//         }

//         parent.addClass(ClassName.open);
//         tree.slideDown(this.options.animationSpeed, function () {
//             $(this.element).trigger(expandedEvent);
//         }.bind(this));
//     };

//     Tree.prototype.collapse = function (tree, parentLi) {
//         var collapsedEvent = $.Event(Event.collapsed);
//         tree.find(Selector.open).removeClass(ClassName.open);
//         parentLi.removeClass(ClassName.open);
//         tree.slideUp(this.options.animationSpeed, function () {
//             tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
//             $(this.element).trigger(collapsedEvent);
//         }.bind(this));
//     };