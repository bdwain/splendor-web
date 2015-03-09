module.exports = function(config){
  config.set({
    basePath : '../',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/**/*.js',
      'app/modules/**/module.js',
      'app/modules/**/*.js',
      'test/unit/mocks/module.js',
      'test/unit/mocks/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/bower_components/**/*.min.js',
      'app/bower_components/**/*lodash.js',
      'app/bower_components/**/*lodash.underscore.js',
      'app/bower_components/**/*ui-bootstrap-tpls*',
      'app/bower_components/moment/*/**'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
