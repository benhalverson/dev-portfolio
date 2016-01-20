'use strict';
var gulp = require('gulp');
var copy = require('gulp-copy');
var rimraf = require('rimraf');
var run = require('gulp-run');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var async = require('async');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
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

gulp.task('watch', function() {
  gulp.watch('source/**/*', ['lint', 'build',])
});

gulp.task('lint', function() {
  return gulp.src(['source/**/*.js','!node_modules/**'])
    .pipe(eslint({
        extends: 'eslint:recommended',
        ecmaFeatures: {
            'modules': true
        },
        globals: {
            'jQuery':false,
            '$':true,
            'angular': true,
            'Masonry': true,
            'google': true,
            'mandrill': true
        },
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.result(function (result) {
      console.log('ESLint result: ' + result.filePath);
      console.log('# Messages: ' + result.messages.length);
      console.log('# Warnings: ' + result.warningCount);
      console.log('# Errors: ' + result.errorCount);

    }));
});

gulp.task('build', function() {
  return gulp.src(['source/**/*.js', 'source/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
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
