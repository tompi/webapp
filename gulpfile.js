var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('js', function () {
    gulp.src([
      // Make sure module webapp is declared first
      'client/js/app.js',
      'client/**/*.js', 
      '!client/js/lib/**/*.js', 
      '!client/bundle.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('client/bundle.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.'))
});
