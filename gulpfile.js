'use strict';

const gulp = require('gulp'),
  packageInfo = require('./package.json'),
  packager = require('electron-packager'),
  runSequence = require('run-sequence'),
  del = require('del'),
  removeCode = require('gulp-remove-code'),
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
      'moveBinaryFiles',
      'moveDependencies'
    ],
    [
      'compileScssWatch',
      'compileTypescriptWatch',
      'moveStaticFilesWatch',
      'moveBinaryFilesWatch'
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
      'moveBinaryFiles',
      'moveDependencies'
    ], [
      'buildElectronApp'
    ]
  );
});

gulp.task('buildElectronApp', () => {
  return packager({
    dir: envConfig.paths.buildDirectory,
    out: envConfig.paths.releasesDirectory + packageInfo.version + '/',
    arch: 'all',
    platform: 'all',
    asar: true,
    'app-version': packageInfo.version,
    icon: envConfig.paths.iconLocation,
    overwrite: true,
    version: envConfig.versions.electron
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
    .pipe(removeCode(envConfig.removeCode))
    .pipe(sourcemaps.init())
    .pipe(typescript(tsConfig))
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('moveStaticFiles', () => {
  return gulp.src([envConfig.paths.staticFiles, '!' + envConfig.paths.binaryFiles, '!' + envConfig.paths.nodeNodeModulesFiles, '!' + envConfig.paths.uiNodeModulesFiles])
    .pipe(changed(envConfig.paths.buildDirectory))
    .pipe(removeCode(envConfig.removeCode))
    .pipe(gulp.dest(envConfig.paths.buildDirectory));
});

gulp.task('moveBinaryFiles', () => {
  return gulp.src([envConfig.paths.binaryFiles])
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

gulp.task('moveBinaryFilesWatch', () => {
  return gulp.watch(envConfig.paths.binaryFiles, { interval: 5000 }, ['moveBinaryFiles']);
});
