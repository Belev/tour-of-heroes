'use strict';

const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const runSequence = require('run-sequence');

const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

const htmlreplace = require('gulp-html-replace');

let buildTime = Date.now();
let stylesBundleFilename = `app.bundle${buildTime}.css`;
let polyfillsBundleFilename = `polyfills.bundle${buildTime}.js`;
let appBundleFilename = `app.bundle${buildTime}.js`;

gulp.task('clean', (callback) => {
  return del(['dist/**/*', '!dist/bundle.js'], callback);
});

gulp.task('compile-ts', ['tslint'], () => {
  let tsResult = gulp.src(['app/**/*.ts', '!app/config/environments/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write('.', {sourceRoot: '/app'}))
    .pipe(gulp.dest('app'));
});

gulp.task('compile-sass', () => {
  return gulp.src('app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest('app'));
});

gulp.task('tslint', () => {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('resources', () => {
  return gulp.src([
    'index.html'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('rename-bundle', () => {
  return gulp.src(`dist/bundle.js`)
    .pipe(rename(appBundleFilename))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-bundle', (callback) => {
  return del(['dist/bundle.js'], callback);
});

gulp.task('bundle-styles', () => {
  return gulp.src('app/styles/**/*.css')
    .pipe(concatCss(stylesBundleFilename))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('bundle-polyfills', () => {
  return gulp.src([
    'core-js/client/shim.min.js',
    'zone.js/dist/zone.js',
    'reflect-metadata/Reflect.js',
  ], {cwd: 'node_modules/**'})
    .pipe(concat(polyfillsBundleFilename))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('html-replace', () => {
  return gulp.src('index.html')
    .pipe(htmlreplace({
      css: `styles/${stylesBundleFilename}`,
      polyfills: polyfillsBundleFilename,
      app: appBundleFilename
    }, {
      keepBlockTags: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['compile-ts', 'compile-sass'], () => {
  gulp.watch('app/**/*.ts', ['compile-ts']).on('change', e => {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch('app/**/*.scss', ['compile-sass']).on('change', e => {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    'compile-sass',
    'bundle-polyfills',
    'bundle-styles',
    'resources',
    'rename-bundle',
    'clean-bundle',
    'html-replace',
    callback
  );
});
