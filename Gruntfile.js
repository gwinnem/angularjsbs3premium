// ABAdmin AngularJs Bs3 Premium Gruntfile
module.exports = function (grunt) { // jshint ignore:line
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            less: {
                // Compiles less files upon saving
                files: ['assets/less/*.less', 
                'assets/less/skins/*.less',
                'assets/less/appviews/*.less', 
                'assets/less/pages/*.less', 
                'assets/less/plugins/*.less'],
                tasks: ['less:development', 'notify:less']
            },
            // skins: {
            //     // Compile any skin less files upon saving
            //     files: ['assets/less/skins/*.less'],
            //     //tasks: ['less:skins', 'less:minifiedSkins', 'notify:less']
            //     tasks: ['less:skins', 'notify:less']
            // },
        },
        // Dev server
        connect: {
            server: {
                options: {
                    port: 8010,
                    index: 'index.html',
                    hostname: 'localhost',
                    open: true,
                    base: ''
                }
            }
        },
        // Notify end of tasks
        notify: {
            less: {
                options: {
                    title: 'ABAdmin',
                    message: 'LESS finished running'
                }
            },
            js: {
                options: {
                    title: 'ABAdmin',
                    message: 'JS bundler finished running'
                }
            }
        },
        // 'less'-task configuration
        // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
        less: {
            // Development not compressed
            development: {
                files: {
                    'css/aurora.css': 'assets/less/aurora.less'
                }
            }
        }
    });

    // Load all grunt tasks

    // LESS Compiler
    grunt.loadNpmTasks('grunt-contrib-less');
    // Watch File Changes
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Compress JS Files
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Include Files Within HTML
    grunt.loadNpmTasks('grunt-includes');
    // Optimize images
    grunt.loadNpmTasks('grunt-image');
    // Validate JS code
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    // Delete not needed files
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Lint CSS
    grunt.loadNpmTasks('grunt-contrib-csslint');
    // Lint Bootstrap
    grunt.loadNpmTasks('grunt-bootlint');
    // Concatenate JS files
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Notify
    grunt.loadNpmTasks('grunt-notify');
    // Replace
    grunt.loadNpmTasks('grunt-text-replace');
    //Development server
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Browsersync
    //https://browsersync.io/docs/grunt
    grunt.loadNpmTasks('grunt-browser-sync');
    
    // The default task (running 'grunt' in console) is 'watch'
    grunt.registerTask('default', ['connect', 'watch']);
};