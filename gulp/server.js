var gulp = require('gulp-help')(require('gulp'));

gulp.task('server', 'Starts the dev server', function () {
  require(__dirname + '/../server');
});
