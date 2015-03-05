module.exports = function(grunt) {

    grunt.initConfig({
        clean: ['dist'],

        copy: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**', '!**/scss/**'],
                    dest: 'dist/'
                }]
            }
        },

        sass: {
            development: {
                options: {
                    sourcemap: 'none',
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/scss',
                    src: ['*.scss'],
                    dest: 'dist/assets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            www: {
                files: ['src/**'],
                tasks: ['copy', 'sass:development']
            }
        },

        nodemon: {
            development: {
                script: 'server.js',
                options: {
                    ignore: ['src'],
                    env: {
                        'NODE_ENV': 'development'
                    }
                }
            }
        },

        concurrent: {
            development: {
                tasks: ['watch:www', 'nodemon:development'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('serve-app', ['clean', 'copy', 'sass:development', 'concurrent:development']);
    grunt.registerTask('build-app', ['clean', 'copy', 'sass:development']);
};
