var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

var files = {
  scripts: ['./www/app/**/*.js', './tests/**/*.js'],
};

gulp.task('lint', function () {
  return gulp.src(files.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(jshint.reporter('fail'));
});

