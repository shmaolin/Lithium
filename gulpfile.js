/*global require*/
"use strict";

var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  gulp_remove_logging = require("gulp-remove-logging"),
  browserSync = require('browser-sync'),
  jscs = require('gulp-jscs');

/*
 * Directories here
 */
var paths = {
  public: './public/',
  sass: './src/sass/',
  css: './public/css/',
  data: './src/_data/',
  js: './public/js/',
  fonts: './public/fonts/',
  img: './public/img/',
  images: './public/css/images/'
};

var scripts_array = [
    './src/js/jquery-3.3.1.min.js',
    './src/js/slick.min.js',
    './src/js/jquery.mCustomScrollbar.js',
    './src/js/app.js'
];

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
  return gulp.src('./src/*.pug')
    .pipe(data(function (file) {
      //console.log(paths.data + path.basename(file.path))
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug({
        pretty: '    '
    }))
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.public));
});
gulp.task('pug-prod', function () {
  return gulp.src('./src/*.pug')
    .pipe(data(function (file) {
      console.log(paths.data + path.basename(file.path))
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug())
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.public));
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    notify: false
  });
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('jshint-app', function() {
     return gulp.src(['./src/js/app.js'])
         //.pipe(jscs({fix: true}))
         //.pipe(jscs.reporter())
         .pipe(jshint())
         .pipe(jshint.reporter('default'))
});

gulp.task('js', function() {
    gulp.start('jshint-app');
    return gulp.src(scripts_array)
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.js))
});

gulp.task('clear-js', function() {
    return gulp.src(['./src/js/app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp_remove_logging())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.js))
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['./src/fonts/**/*.*'])
        .pipe(gulp.dest(paths.fonts));
});

// img
gulp.task('img', function() {
    return gulp.src(['./src/img/**/*.*'])
        .pipe(gulp.dest(paths.img));
});

// images
gulp.task('images', function() {
    return gulp.src(['./src/images/**/*.*'])
        .pipe(gulp.dest(paths.images));
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/fonts/**/*.*', ['fonts']);
  gulp.watch('./src/img/**/*.*', ['img']);
  gulp.watch('./src/images/**/*.*', ['images']);
});

gulp.task('directories', function () {
    console.log(gulp.src('*.*', {read: false}));
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('./public/css/images'))
        .pipe(gulp.dest('./public/img'))
        .pipe(gulp.dest('./public/fonts'))
    .pipe(gulp.dest('./public/js'));
});

// Build task compile sass and pug.
gulp.task('build', ['sass', 'pug', 'js']);
gulp.task('prebuild', ['sass', 'pug', 'js', 'images', 'fonts', 'img']);
gulp.task('prod', ['sass', 'pug', 'clear-js']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['prebuild', 'browser-sync', 'watch']);

