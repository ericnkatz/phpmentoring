'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	neat = require('node-neat').includePaths,
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify-css'),
	watch = require('gulp-watch'),
    livereload = require('gulp-livereload');


gulp.task('default', function() {
    gulp.start('scripts');
    gulp.start('styles');
});


gulp.task('watch', function() {
  	livereload.listen();
	gulp.watch('resources/js/*.js', ['scripts']);
	gulp.watch('resources/sass/*.scss', ['styles']);
});

gulp.task('scripts', function() {
	return gulp.src('resources/js/app.js')
    // This will output the non-minified version
    .pipe(gulp.dest('public/js/'))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/js/'))
    .pipe(livereload());
});

gulp.task('styles', function() {
	return gulp.src('resources/sass/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/css'))
	.pipe(minify())

	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('public/css/'))
    .pipe(livereload());
});


