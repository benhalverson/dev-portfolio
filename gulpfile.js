'use strict';
var gulp = require('gulp');
var copy = require('copy');
var rimraf = require('rimraf');
var run = require('gulp-run');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var async = require('async');

var paths = {
  filesrc: 'source/**/*',
  filepath: 'public',
  cleanedfiles: [
    'public/templates',
    'public/css',
    'public/js'
  ]
}

gulp.task('watch', function() {
  gulp.watch('source/**/*', ['build'])
});

gulp.task('build', function() {
  return gulpt.src(['source/**/*.js', 'source/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(addsrc('source/**/*.html'))
    .pipe(addsrc('source/**/*.css'))
    .pipe(gulp.dest(paths.filepath))
    .on('error', gutil.log)
});

gulp.task('bower', function() {
  run('bower i').exec(cb)
  .on('error', gutil.log);
});

gulp.task('clean', function() {
  async.each(paths.cleanedfiles, rimraf, cb);
});

gulp.task('default', ['build', 'bower', 'watch']);
