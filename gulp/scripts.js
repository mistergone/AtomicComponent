'use strict';

var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var webpackStream = require('webpack-stream');
var config = require( '../config' );


/**
 * Generate main bundle.
 * @returns {PassThrough} A source stream.
 */
function scripts() {
  return gulp.src( './index.js' )
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      }
    }))
    .pipe(gulpUglify())
    .pipe(gulpRename('main.min.js'))
    .pipe(gulp.dest( config.BUILD ))
}

gulp.task( 'scripts', scripts );
