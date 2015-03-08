var gulp = require('gulp');
//TODO: switch gulp-karma to plain karma when https://github.com/karma-runner/karma/issues/1037 is closed
var karma = require('gulp-karma');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stripDebug = require('gulp-strip-debug');
var sourcemaps = require('gulp-sourcemaps');
var wrap = require('gulp-wrap');
var ngAnnotate = require('gulp-ng-annotate');

var srcFiles = ['app/js/**/module.js', 'app/js/**/*.js'];

gulp.task('js:verify', ['js:test', 'js:hint']);

gulp.task('js:build:debug', ['js:build:src:debug', 'js:build:deps:debug']);
gulp.task('js:build:release', ['js:build:src:release', 'js:build:deps:release']);

gulp.task('js:watch:build', ['js:build:debug'], function () {
  gulp.watch(srcFiles, ['js:build:src:debug']);
});
gulp.task('js:watch', ['js:build:debug', 'js:watch:build', 'js:watch:test']);
gulp.task('js:watch:debug', ['js:build:debug', 'js:watch:build', 'js:watch:test:debug']);

gulp.task('js:build:deps:debug', function () {
  var excluded = ['!**/*lodash.min*', '!**/*lodash.underscore*', '!**/*ui-bootstrap-tpls*', '!' + global.bower_path + 'moment/min/*locales*'];
  var deps = [global.bower_path + 'moment/**/*.min.js', global.bower_path + 'angular/angular.min.js', global.bower_path + '**/*.min.js', 'app/lib/**/*.min.js'].concat(excluded);
  return gulp.src(deps)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('dependencies.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:build:src:debug', function () {
  return gulp.src(srcFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(ngAnnotate({add: true, single_quotes: true}))
    .pipe(wrap('(function(){\n\'use strict\';\n<%= contents %>\n})();'))
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:build:partials-cache', function(){
  return gulp.src(['app/partials/**/*.html'])
    .pipe(templateCache({root: 'partials/',standalone: false, module: 'splendor'}))
    .pipe(concat('partials.js'))
    .pipe(uglify())
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:build:template-cache', function(){
  return gulp.src(['app/template/**/*.html'])
    .pipe(templateCache({root: 'template/', standalone: false, module: 'splendor'}))
    .pipe(concat('templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:build:src:release', ['js:build:partials-cache', 'js:build:template-cache', 'js:build:src:debug'], function () {
  return gulp.src([global.asset_path + 'app.js', global.asset_path + 'partials.js', global.asset_path + 'templates.js'])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:build:deps:release', ['js:build:deps:debug'], function () {
  return gulp.src([global.asset_path + 'dependencies.js'])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(global.asset_path));
});

gulp.task('js:test', function () {
  return gulp.src('blah') //need a fake file to get it to use the files from karma.conf.js
    .pipe(karma({
      configFile: 'test/karma.conf.js'
    }))
    .on('error', function(err){
      throw err;
    });
});

gulp.task('js:watch:test', function () {
  return gulp.src('blah') //need a fake file to get it to use the files from karma.conf.js
    .pipe(karma({
      configFile: 'test/karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('js:watch:test:debug', function () {
  return gulp.src('blah') //need a fake file to get it to use the files from karma.conf.js
    .pipe(karma({
      configFile: 'test/karma.conf.js',
      action: 'watch',
      browsers: ['Chrome']
    }));
});

gulp.task('js:hint', function () {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
