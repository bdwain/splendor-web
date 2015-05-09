var gulp = require('gulp-help')(require('gulp'));
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');

gulp.task('css:build:debug', function () {
  var files = mainBowerFiles('**/*.css', {paths: {bowerDirectory: global.bower_path}});
  files = files.concat(['app/css/**/*.css', 'app/modules/**/*.css']);
  return gulp.src(files)
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