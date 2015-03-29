module.exports = {
  options: {
    livereload: true
  },
  css: {
    files: ['client/**/*.css', '!**/*.min.css'],
    tasks: []
  },
  js: {
    files: ['client/**/*.js', '!**/*.min.js', '!client/js/bundle.js'],
    tasks: ['browserify']
  },
  less: {
    files: ['client/**/*.less'],
    tasks: ['less']
  },
  html: {
    files: ['client/**/*.html'],
    tasks: []
  }
};
