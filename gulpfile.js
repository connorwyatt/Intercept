'use strict';

const gulp = require('gulp'),
  packager = require('electron-packager'),
  runSequence = require('run-sequence'),
  del = require('del'),
  changed = require('gulp-changed'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  typescript = require('gulp-typescript');

const config = require('./gulpConfig');

let envConfig;

gulp.task('default', ['development']);

gulp.task('development', () => {
  envConfig = config.DEVELOPMENT;

  return runSequence(
    'clean',
    [
      'compileScss',
      'compileTypescript',
      'moveStaticFiles',
      'moveDependencies'
    ],
    [
      'compileScssWatch',
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
      'compileScss',
      'compileTypescript',
      'moveStaticFiles',
      'moveDependencies'
    ], [
      'buildElectronApp'
    ]
  );
});

gulp.task('buildElectronApp', () => {
  return packager({
    dir: envConfig.paths.buildDirectory,
    out: '.releases/',
    arch: 'all',
    platform: 'darwin',
    asar: true,
    icon: './icons/logo',
    overwrite: true
  }, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

gulp.task('clean', () => {
  return del(envConfig.paths.buildDirectory);
});

gulp.task('compileScss', () => {
  return gulp.src([
      envConfig.paths.scssFiles
    ])
    .pipe(changed(envConfig.paths.buildDirectory))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('compileTypescript', () => {
  let tsConfig = typescript.createProject(envConfig.paths.tsConfig);

  return gulp.src([
      envConfig.paths.typescriptFiles,
      'src/node_modules/angular2/typings/browser.d.ts'
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

gulp.task('compileScssWatch', () => {
  return gulp.watch([
    envConfig.paths.scssFiles
  ], { interval: 1000 }, ['compileScss']);
});

gulp.task('compileTypescriptWatch', () => {
  return gulp.watch([
    envConfig.paths.typescriptFiles,
    'src/node_modules/angular2/typings/browser.d.ts'
  ], { interval: 1000 }, ['compileTypescript']);
});

gulp.task('moveStaticFilesWatch', () => {
  return gulp.watch(envConfig.paths.staticFiles, { interval: 1000 }, ['moveStaticFiles']);
});
