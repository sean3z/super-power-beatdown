module.exports = function(grunt) {

  require('jit-grunt')(grunt);

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

  grunt.registerTask('serve', ['clean', 'copy', 'sass:development', 'concurrent:development']);
  grunt.registerTask('build', ['clean', 'copy', 'sass:development']);
};
