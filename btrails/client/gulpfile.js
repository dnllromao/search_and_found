const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps'); 

// compile sass/scss
gulp.task('sass', function() {
	return gulp.src('./src/sass/App.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./src'));
});

// watch all sass files and run the sass task whenever a file is saved
gulp.task('sass:watch', function() {
	gulp.watch('./src/sass/App.scss', ['sass']);
});

gulp.task('default', ['sass']);