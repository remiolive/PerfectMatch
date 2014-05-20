"use strict";

// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./Phone/www/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compass', function() {
  gulp.src('./Phone/www/sass/*.scss')
  .pipe(compass({
    config_file: './Phone/www/config.rb',
    css: './Phone/www/css',
    sass: './Phone/www/sass'
  }))
  .pipe(gulp.dest('./Phone/www/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./Phone/www/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./Phone/www/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./Phone/www/dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./Phone/www/js/*.js', ['lint', 'scripts']);
    gulp.watch('./Phone/www/scss/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['lint', 'compass', 'scripts', 'watch']);