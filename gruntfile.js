module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n\n//------------------------------------------------------------------\n',
        banner: '\n\n//------------------------------------------------------------------\n'
      },
      dist: {
        src: ['components/scripts/*.js'],
        dest:'build/js/script.js'
      }
    },
    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: ['components/scripts/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'watch']);
};