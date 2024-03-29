/**
 * Setting up toggle switches
 */
/**
 * Navbar Messages Switch
 */
$('#toggle-navbar-messages').bootstrapToggle({
    on: 'Visible',
    off: 'Hidden',
    onstyle: 'success',
    offstyle: 'danger',
    size: 'mini',
    width: 60
});
$('#toggle-navbar-messages').bootstrapToggle('on');
// Event handler
$('#toggle-navbar-messages').change(function () {
    if ($(this).prop('checked')) {
        if ($('.messages-menu').hasClass('hidden')) {
            $('.messages-menu').removeClass('hidden');
        }
    } else {
        $('.messages-menu').addClass('hidden');
    }
});

/**
 * Navbar Notifications Switch
 */
$('#toggle-navbar-notifications').bootstrapToggle({
    on: 'Visible',
    off: 'Hidden',
    onstyle: 'success',
    offstyle: 'danger',
    size: 'mini',
    width: 60
});
$('#toggle-navbar-notifications').bootstrapToggle('on');
// Event handler
$('#toggle-navbar-notifications').change(function () {
    if ($(this).prop('checked')) {
        if ($('.notifications-menu').hasClass('hidden')) {
            $('.notifications-menu').removeClass('hidden');
        }
    } else {
        $('.notifications-menu').addClass('hidden');
    }
});

/**
 * Navbar Tasks Switch
 */
$('#toggle-navbar-tasks').bootstrapToggle({
    on: 'Visible',
    off: 'Hidden',
    onstyle: 'success',
    offstyle: 'danger',
    size: 'mini',
    width: 60
});
$('#toggle-navbar-tasks').bootstrapToggle('on');
// Event handler
$('#toggle-navbar-tasks').change(function () {
    if ($(this).prop('checked')) {
        if ($('.tasks-menu').hasClass('hidden')) {
            $('.tasks-menu').removeClass('hidden');
        }
    } else {
        $('.tasks-menu').addClass('hidden');
    }
});

/**
 * Navbar Left side menu Switch
 */
$('#toggle-navbar-leftmenu').bootstrapToggle({
    on: 'Visible',
    off: 'Hidden',
    onstyle: 'success',
    offstyle: 'danger',
    size: 'mini',
    width: 60
});
$('#toggle-navbar-leftmenu').bootstrapToggle('on');
// Event handler
$('#toggle-navbar-leftmenu').change(function () {
    if ($(this).prop('checked')) {
        if ($('#topnav-left').hasClass('hidden')) {
            $('#topnav-left').removeClass('hidden'); 
        }
        if ($('#topnav-left-search').hasClass('hidden')) {
            $('#topnav-left-search').removeClass('hidden');   
        }
    } else {
        $('#topnav-left').addClass('hidden');
        $('#topnav-left-search').addClass('hidden');
    }
});


$(document).ready(function () {
    $('.tooltip').tooltipster({
        animation: 'fade',
        delay: 200,
    });
});