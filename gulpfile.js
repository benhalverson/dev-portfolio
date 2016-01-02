'use strict';
var gulp = require('gulp');
var copy = require('gulp-copy');
var rimraf = require('rimraf');
var run = require('gulp-run');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var async = require('async');
// var imageop = require('gulp-image-optimization');


var paths = {
  filesrc: 'source/**/*',
  filepath: 'public',
  cleanedfiles: [
    'public/templates',
    'public/css',
    'public/images',
    'public/js',
    'public/fonts'
  ]
}

// gulp.task('images', function(cb) {
//     gulp.src(['source/**/*.png','source/**/*.jpg']).pipe(imageop({
//         optimizationLevel: 5,
//         progressive: true,
//         interlaced: true
//     })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
// });

gulp.task('watch', function() {
  gulp.watch('source/**/*', ['build',])
});

gulp.task('build', function() {
  return gulp.src(['source/**/*.js', 'source/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(addsrc('source/**/*.html'))
    .pipe(addsrc('source/**/*.js'))
    .pipe(addsrc('source/**/*.css'))
    .pipe(addsrc('source/**/*.png'))
    .pipe(addsrc('source/**/*.jpg'))
    .pipe(addsrc('source/**/*.woff'))
    .pipe(addsrc('source/**/*.ttf'))
    .pipe(gulp.dest(paths.filepath))
    .on('error', gutil.log)
});

gulp.task('bower', function(cb) {
  run('bower i').exec(cb)
  .on('error', gutil.log);
});

gulp.task('clean', function(cb) {
  async.each(paths.cleanedfiles, rimraf, cb);
});

gulp.task('default', ['build', 'bower', 'watch']);
