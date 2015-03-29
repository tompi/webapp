module.exports = {
  all: [
    '*.js', 
    'client/**/*.js', 
    '!client/js/bundle.js', 
    'server/**/*.js', 
    'tasks/**/*.js', 
    '!**/*.min.js',
    '!**/lib/*.js'
  ]
};
