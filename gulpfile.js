const   gulp = require('gulp'),
        webserver = require('gulp-webserver'),
        postcss = require('gulp-postcss'),
        cssnext = require('postcss-cssnext'),
        gutil = require('gulp-util'),
        sourcemaps = require('gulp-sourcemaps'),
        connect = require('gulp-connect-php'),

        source = 'builds/development/',
        dest = 'builds/production/assets/';

        gulp.task('php', function() {
        	gulp.src('builds/production/*.php');
        });

        gulp.task('css', function() {
        	gulp.src('source' + 'css/style.css')
				.pipe(sourcemaps.init())
				.pipe(postcss([
					require('postcss-partial-import')
				]))

        })