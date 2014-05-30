var gulp = require('gulp');
var gutil = require('gulp-util');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');

var files = {
  scripts: ['./www/app/**/*.js', './tests/**/*.js'],
  tests: ['./tests/**/*.js']
};

gulp.task('lint', function () {
  return gulp.src(files.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {
  return gulp.src(files.tests)
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'watch'
    })).on('error', function (err) { throw err; });
});
