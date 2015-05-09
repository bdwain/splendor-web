var mainBowerFiles = require('main-bower-files');
module.exports = function(config){
  var files = mainBowerFiles('**/*.js', {paths: {bowerDirectory: 'app/bower_components'}});
  files = files.concat([
    'app/modules/**/module.js',
    'app/modules/**/*.js',
    'test/unit/mocks/module.js',
    'test/unit/mocks/**/*.js',
    'test/unit/**/*.js'
  ]);

  config.set({
    basePath : '../',
    files : files,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
            ]
  });
};
