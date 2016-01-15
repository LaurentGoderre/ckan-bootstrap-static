module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-run-task', '!grunt-assemble-*']
    });

    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/fonts/',
                        src: '**/*.*',
                        dest: 'fonts'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts',
                        src: '*.*',
                        dest: 'fonts'
                    }
                ]
            }
        },

        sass: {
            main: {
                files: {
                    'css/main.css' : 'src/scss/main.scss'
                }
            }
        },

        assemble: {
            options: {
                assets: '..',
                plugins: ['grunt-assemble-permalinks'],
                partials: ['src/includes/**/*.hbs'],
                layout: ['src/layouts/default.hbs'],
                data: ['src/data/*.{json,yml}'],
              },
              site: {
                  expand: true,
                  cwd: 'src',
                  src: '*.hbs',
                  dest: '.'
              }
        }

        // concat: {
        //     options: {
        //         banner: '<%= banner %>',
        //         stripBanners: true
        //     },
        //     dist: {
        //         src: ['lib/ckan bootstrap static.js'],
        //         dest: 'dist/ckan bootstrap static.js'
        //     }
        // },
        // uglify: {
        //     options: {
        //         banner: '<%= banner %>'
        //     },
        //     dist: {
        //         src: '<%= concat.dist.dest %>',
        //         dest: 'dist/ckan bootstrap static.min.js'
        //     }
        // },
        // jshint: {
        //     options: {
        //         node: true,
        //         curly: true,
        //         eqeqeq: true,
        //         immed: true,
        //         latedef: true,
        //         newcap: true,
        //         noarg: true,
        //         sub: true,
        //         undef: true,
        //         unused: true,
        //         eqnull: true,
        //         browser: true,
        //         globals: { jQuery: true },
        //         boss: true
        //     },
        //     gruntfile: {
        //         src: 'gruntfile.js'
        //     },
        //     lib_test: {
        //         src: ['lib/**/*.js', 'test/**/*.js']
        //     }
        // },
        // qunit: {
        //     files: ['test/**/*.html']
        // },
        // watch: {
        //     gruntfile: {
        //         files: '<%= jshint.gruntfile.src %>',
        //         tasks: ['jshint:gruntfile']
        //     },
        //     lib_test: {
        //         files: '<%= jshint.lib_test.src %>',
        //         tasks: ['jshint:lib_test', 'qunit']
        //     }
        // }
    });

    // Default task
    grunt.registerTask('default', ['copy', 'sass', 'assemble']);
};
