var gulp = require('gulp-help')(require('gulp'));
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var rev  = require('gulp-rev');
var zip = require('gulp-zip');
var fs = require('fs');

gulp.task('package:copy:img', function(){
  return gulp.src(['app/img/**/*'], {base: 'app/'}) 
    .pipe(gulp.dest(global.dist_path));
});

gulp.task('package:rev', ['js:build:release', 'css:build:release'], function () {
  var assets = [
    global.asset_path + 'app.css',
    global.asset_path + 'app.js',
    global.asset_path + 'dependencies.js'
  ];
  return gulp.src(assets)
    .pipe(rev())
    .pipe(gulp.dest(global.dist_path + 'assets/'))
    .pipe(rev.manifest({path: 'asset_manifest.json'}))
    .pipe(gulp.dest(global.dist_path))
});

gulp.task('package:build:index', ['package:rev'], function(){
  var asset_manifest = JSON.parse(fs.readFileSync(global.dist_path + 'asset_manifest.json', 'utf8'));
  for(var key in asset_manifest)
  {
    asset_manifest[key] = 'assets/' + asset_manifest[key];
  }
  
  return gulp.src('app/index.ejs')
    .pipe(ejs({manifest: asset_manifest}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(global.dist_path));
});

gulp.task('package:build:all', 'Puts every deployable asset in the dist folder', ['package:build:index', 'package:copy:img']);

gulp.task('package:zip', 'Zips up all deployable assets in the dist folder', ['package:build:all'], function(){  
  return gulp.src([global.dist_path + '**/*', '!' + global.dist_path + 'asset_manifest.json'])
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest(global.dist_path));
});