//pull in dependecies
const   gulp = require('gulp'),
        postcss = require('gulp-postcss'),
        cssnext = require('postcss-cssnext'),
        gutil = require('gulp-util'),
        sourcemaps = require('gulp-sourcemaps'),
		connect = require('gulp-connect-php'),
		browserSync = require('browser-sync'),

        source = 'builds/development/',
		dest = 'builds/production/assets/';
		
		gulp.task('php', function() {
			gulp.src('builds/production/*.php');
		});

        gulp.task('css', function() {
			gulp.src(source + 'css/style.css')
				.pipe(sourcemaps.init())
				.pipe(postcss([
					require('postcss-partial-import')({prefix: '_', extension: '.css'}),
					cssnext()
				]))
				.on('error', gutil.log)
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(dest + 'css'));
		});

		gulp.task('connect-sync', function() {
			connect.server({}, function (){
			  browserSync({
				proxy: 'http://localhost/1_starter_files/dev_start_php/builds/production'
			  });
			});

		  });


        gulp.task('watch', function() {
			gulp.watch(source + 'css/**/*.css', ['css']).on('change', function() {
				browserSync.reload();
			});
			gulp.watch('builds/production/*.php', ['php']).on('change', function() {
				browserSync.reload();
			});
		});

		gulp.task('default', ['php', 'css', 'connect-sync', 'watch']);
		
		   
	