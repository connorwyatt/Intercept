'use strict';


const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del');

const config = require('./gulpConfig');

let envConfig;

gulp.task('default', ['development']);

gulp.task('development', () => {
  envConfig = config.DEVELOPMENT;

  return runSequence(
    'clean',
    [
      'moveStaticFiles'
    ]
  );
});

gulp.task('production', () => {
  envConfig = config.PRODUCTION;

  return runSequence(
    'clean',
    [
      'moveStaticFiles'
    ]
  );
});

gulp.task('clean', () => {
  return del(envConfig.buildDirectory);
});

gulp.task('moveStaticFiles', () => {
  return gulp.src(envConfig.paths.staticFiles)
    .pipe(gulp.dest(envConfig.buildDirectory));
});
