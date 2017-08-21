//pull in dependecies
const   gulp = require('gulp'),
        postcss = require('gulp-postcss'),
        cssnext = require('postcss-cssnext'),
        gutil = require('gulp-util'),
        sourcemaps = require('gulp-sourcemaps'),
		connect = require('gulp-connect-php'),
		browserSync = require('browser-sync'),
		browserify = require('browserify'),
		concat = require('gulp-concat'),

        source = 'builds/development/',
		dest = 'builds/production/',
		jsSource = [
			source + 'javasctipt/test.js'
		];
		
		gulp.task('php', function() {
			gulp.src(source + '/*.php')
				.pipe(gulp.dest(dest));
		});

		gulp.task('inc', function() {
			gulp.src(source + '/*.inc.php')
				.pipe(gulp.dest(dest + 'includes/'));
		});

        gulp.task('css', function() {
			gulp.src(source + 'assets/css/style.css')
				.pipe(sourcemaps.init())
				.pipe(postcss([
					require('postcss-partial-import')({prefix: '_', extension: '.css'}),
					cssnext()
				]))
				.on('error', gutil.log)
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(dest + 'assets/css/'));
		});

		gulp.task('js', function() {
			gulp.src(jsSource)
				.pipe(concat('script.js'))
				.pipe(browserify())
				.pipe(gulp.dest(dest + 'assets/js/'))
		});

		gulp.task('connect-sync', function() {
			connect.server({}, function (){
			  browserSync({
				proxy: 'http://localhost/1_starter_files/dev_start_php/builds/production'
			  });
			});

		  });


        gulp.task('watch', function() {
			gulp.watch(source + 'assets/css/**/*.css', ['css']).on('change', function() {
				browserSync.reload();
			});
			gulp.watch(source + '*.php', ['php']).on('change', function() {
				browserSync.reload();
			});
			gulp.watch(source + 'includes/*.inc.php').on('change', function() {
				browserSync.reload();
			})
		});

		gulp.task('default', ['php', 'inc',  'css', 'connect-sync', 'watch']);
		
		   
	