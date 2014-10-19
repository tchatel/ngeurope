module.exports = function (config) {
    config.set({
        basePath: 'exo',
        files: [
            'app/lib/angular/angular.js',
            '../app/lib/angular/angular-mocks.js',
            '../app/lib/angular/angular-*.js',
            '../app/js/**/*.js',
            '../app/templates/**/*.html'
        ],
        preprocessors: {
            'app/templates/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'templates'
        },
        autoWatch: true,

        frameworks: ['jasmine'],
        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
