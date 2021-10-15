const gulp = require('gulp');
const { series, parallel } = require('gulp');
const clean = require('gulp-clean');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const atimport = require('postcss-import');
const tailwindnesting = require('tailwindcss/nesting');
const stripCssComments = require('gulp-strip-css-comments');
const cleanCSS = require('gulp-clean-css');
const footer = require('gulp-footer');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

/* This config file adds this project's files to be purged with PurgeCSS */
const TAILWIND_CONFIG = './config/tailwind.config.js';
/* Default desy cleancss file */
const CLEANCSS_CONFIG = './node_modules/desy-frontend/config/clean-css.js';
/* This project's files to be compiled */
const SOURCE_HTML_DIR = './src/**.html';
/* This project's files AND desy files to be searched for in nunjucks recursive compilation */
const SOURCE_NUNJUCKS_PATHS = ['./src/templates/','./node_modules/desy-frontend/src/templates/'];
/* This project's files to be watched */
const SOURCE_NUNJUCKS_FILES = ['./src/templates/**/*'];
/* This project's html files to be compiled */
const SOURCE_NUNJUCKS_DIR = ['./src/**/*.html'];

const SOURCE_JS_DIR = ['./node_modules/desy-frontend/src/js/**/*.js','./src/js/index.js'];
const SOURCE_STYLESHEET = './src/css/styles.css';
const SOURCE_STYLESHEET_DIR = './src/**/*.css';
const DESTINATION_HTML_DIR = './dist/';
const DESTINATION_JS_DIR = './dist/js';
const DESTINATION_STYLESHEET = './dist/css/';


function bs(cb) {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch([TAILWIND_CONFIG, SOURCE_STYLESHEET_DIR, ], gulp.series(css, reload));
  gulp.watch([SOURCE_HTML_DIR, ...SOURCE_JS_DIR, ...SOURCE_NUNJUCKS_DIR, ...SOURCE_NUNJUCKS_FILES], gulp.series(html, nunjucks, js, reload));

  cb();
}


function reload(cb) {
  browserSync.reload();
  cb();
}


function css() {
  return gulp.src(SOURCE_STYLESHEET)
    .pipe(
      postcss([
      atimport(),
      tailwindnesting(),
      tailwindcss(TAILWIND_CONFIG),
      autoprefixer()
      ])
    )
    .pipe(stripCssComments({preserve: false}))
    .pipe(cleanCSS(require(CLEANCSS_CONFIG)))
    .pipe(footer('\n'))
    .pipe(gulp.dest(DESTINATION_STYLESHEET));
}


function html() {
  return gulp.src(SOURCE_HTML_DIR)
    .pipe(gulp.dest(DESTINATION_HTML_DIR));
}


function nunjucks() {
  return gulp.src(SOURCE_NUNJUCKS_DIR)
    .pipe(nunjucksRender({
        envOptions: {
          autoescape: true,
          trimBlocks: true,
          lstripBlocks: true,
          noCache: true
        },
        path: SOURCE_NUNJUCKS_PATHS // String or Array
      }))
    .pipe(gulp.dest(DESTINATION_HTML_DIR));
}


function js() {
  return gulp.src(SOURCE_JS_DIR)
    .pipe(gulp.dest(DESTINATION_JS_DIR));
}


function version() {
  return gulp.src('./package.json')
    .pipe(gulp.dest('./dist/'));
}


function license() {
  return gulp.src('./src/EUPL-1.2.txt')
    .pipe(gulp.dest('./dist/'));
}


function cleanFolder() {
  return gulp.src(DESTINATION_HTML_DIR, {read: false, allowEmpty: true})
    .pipe(clean());
}


exports.default = series(nunjucks, cleanFolder, css, nunjucks, js, license, version, bs);
