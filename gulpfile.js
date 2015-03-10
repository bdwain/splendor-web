'use strict';
var fs = require('fs');
var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var runSequence = require('run-sequence');

global.asset_path = "app/assets/";
global.bower_path = "app/bower_components/";
global.dist_path = "dist/";

fs.readdirSync(__dirname + '/gulp').forEach(function (module) {
  require(__dirname + '/gulp/' + module);
});

gulp.task('clean', 'Clean assets and dist', function (cb) {
  del([global.asset_path, global.dist_path], cb);
});

gulp.task('default', 'Start a server and run js/css build watchers and test watchers', ['clean'], function(cb){
  runSequence(['js:watch', 'css:watch', 'server'], cb); //these just need to run after. they can be in parallel
}, {aliases: ['run', 'start']});

gulp.task('debug', 'Same as the default task, but uses chrome as the test browser so you can use the js debugger', ['clean'], function(cb){
  runSequence(['js:watch:debug', 'css:watch', 'server'], cb); //these just need to run after. they can be in parallel
});

gulp.task('test', 'Run all javascript tests', ['js:test']);

gulp.task('verify', 'Run all test and verification tasks', ['js:verify']);

gulp.task('package', 'Run all tests and generate a zip file that can be deployed', function(cb){
  runSequence('clean', ['js:test', 'package:zip'], cb); //so clean runs before package
});