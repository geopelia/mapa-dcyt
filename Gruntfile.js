module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      css: {
        src: ['styles/**/*.css', '!styles/**/*.min.css'],
        dest: 'styles/<%= pkg.name %>.min.css'
      }
    },
    concat: {
      options: {
// define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
    // the files to concatenate
        src: ['src/**/*.js'],
    // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },    
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['styles/**/*.css'],
        tasks: ['cssmin']
        
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint','concat', 'uglify']
      },
      html: {
        files: ['index.html','**/*.html'],     
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },	
    connect: {
      all: {
	options: {
          port: 9000,
       	  open: true,
          livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
        }
      }
      
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server', ['jshint','concat', 'uglify', 'cssmin', 'connect', 'watch']);
  // Default task(s).
  grunt.registerTask('default', ['jshint','concat', 'uglify', 'cssmin']);
  
  grunt.registerTask('pig', 'My "pig" task.', function() {
    grunt.log.writeln('Oink! Oink!');
  });

};
