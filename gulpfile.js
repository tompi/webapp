var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require('del');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');

// Bundle all of our "own" js into 1 file
gulp.task('js', function () {
  gulp.src([
      // Make sure module webapp is declared first
      'client/js/app.js',
      'client/**/*.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('./build/client/'));
});

// Bundle all libraries into 1 file
gulp.task('js-libs', function () {
  gulp.src([
      // Sequence here matters
      'bower_components/lodash/dist/lodash.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/datatables/media/js/jquery.dataTables.js',
      'bower_components/datatables-bootstrap3/BS3/assets/js/datatables.js',
      'bower_components/moment/moment.js',
      'bower_components/toastr/toastr.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('libs-bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('./build/client/'));
});

gulp.task('copy-static-files', function() {
  gulp.src(['./client/**/!(*.js)', '!./client/js/**'])
      .pipe(gulp.dest('./build/client'));
  gulp.src('./*.json')
      .pipe(gulp.dest('./build/client/home'));
});

gulp.task('copy-static-files-libs', ['clean'], function() {
  gulp.src('bower_components/font-awesome/fonts/*')
      .pipe(gulp.dest('./build/client/assets/fonts/'));
  gulp.src('bower_components/datatables-bootstrap3/BS3/assets/images/*')
      .pipe(gulp.dest('./build/client/assets/img/'));
});

// Delete gulp-generated files
gulp.task('clean', function(cb) {
  del(['build/**'], cb);
});

// Javascript linting
gulp.task('jshint', function() {
  return gulp.src(['./**/*.js', '!./bower_components/**', '!./node_modules/**', '!./build/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Generate css from less-files and concatenate all css:
gulp.task('less', function(){
    return gulp.src('client/css/custom.less')
      .pipe(less())
      .pipe(gulp.dest('./build/client'));
});

gulp.task('default',
  [
    'jshint', 
    'clean', 
    'copy-static-files', 
    'copy-static-files-libs', 
    'js-libs', 
    'js', 
    'less'
  ]);
