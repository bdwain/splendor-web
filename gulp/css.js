var gulp = require('gulp-help')(require('gulp'));
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css:build:debug', function () {
  var cssFiles = [global.bower_path + '**/*.css', 'app/css/*.css', '!**/*.min.css'];
  return gulp.src(cssFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(global.asset_path))
});

gulp.task('css:build:release', ['css:build:debug'], function(){
  return gulp.src(global.asset_path + 'app.css')
    .pipe(cssMin())
    .pipe(gulp.dest(global.asset_path))
});

gulp.task('css:watch', ['css:build:debug'], function () {
  gulp.watch('app/css/**/*.css', ['css:build:debug']);
});