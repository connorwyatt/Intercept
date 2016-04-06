'use strict';

const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  typescript = require('gulp-typescript');

const config = require('./gulpConfig');

let envConfig;

gulp.task('default', ['development']);

gulp.task('development', () => {
  envConfig = config.DEVELOPMENT;

  return runSequence(
    'clean',
    [
      'compileTypescript',
      'moveStaticFiles'
    ],
    [
      'compileTypescriptWatch',
      'moveStaticFilesWatch'
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
  return del(envConfig.paths.buildDirectory);
});

gulp.task('compileTypescript', () => {
  let tsConfig = typescript.createProject(envConfig.paths.tsConfig);

  return gulp.src([
      envConfig.paths.typescriptFiles,
      'src/node_modules/angular2/typings/browser.d.ts',
      '!' + envConfig.paths.nodeModulesFiles
    ])
    .pipe(typescript(tsConfig))
    .js
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('moveStaticFiles', () => {
  return gulp.src(envConfig.paths.staticFiles)
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('compileTypescriptWatch', () => {
  return gulp.watch([
    envConfig.paths.typescriptFiles,
    'src/node_modules/angular2/typings/browser.d.ts',
    '!' + envConfig.paths.nodeModulesFiles
  ], ['compileTypescript']);
});

gulp.task('moveStaticFilesWatch', () => {
  return gulp.watch(envConfig.paths.staticFiles, ['moveStaticFiles']);
});
