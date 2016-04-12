'use strict';

const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  changed = require('gulp-changed'),
  sourcemaps = require('gulp-sourcemaps'),
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
      'moveStaticFiles',
      'moveDependencies'
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
      '!' + envConfig.paths.uiNodeModulesFiles
    ])
    .pipe(changed(envConfig.paths.buildDirectory, { extension: '.js' }))
    .pipe(sourcemaps.init())
    .pipe(typescript(tsConfig))
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('moveStaticFiles', () => {
  return gulp.src([envConfig.paths.staticFiles, '!' + envConfig.paths.nodeNodeModulesFiles, '!' + envConfig.paths.uiNodeModulesFiles])
    .pipe(changed(envConfig.paths.buildDirectory))
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('moveDependencies', () => {
  return gulp.src([envConfig.paths.nodeNodeModulesFiles, envConfig.paths.uiNodeModulesFiles])
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('compileTypescriptWatch', () => {
  return gulp.watch([
    envConfig.paths.typescriptFiles,
    'src/node_modules/angular2/typings/browser.d.ts',
    '!' + envConfig.paths.uiNodeModulesFiles
  ], { interval: 1000 }, ['compileTypescript']);
});

gulp.task('moveStaticFilesWatch', () => {
  return gulp.watch(envConfig.paths.staticFiles, { interval: 1000 }, ['moveStaticFiles']);
});
