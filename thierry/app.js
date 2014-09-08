'use strict';

angular.module('app', ['ngMessages'])
    .controller('FormController', function ($scope, $http) {
        var descUrl = 'https://api.mongolab.com/api/1/databases/forms/collections/forms/51669d15e4b04a20de65fc58?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i';
        $http.get(descUrl).success(function (data, status) {
            $scope.fields = data.fields;
        });
        $scope.obj = {};
    })
    .directive('autoform', function () {
        return {
            restrict: 'EA',
            scope: {
                desc: '=',
                object: '='
            },
            require: 'autoform',
            templateUrl: 'autoform.html',
            transclude: true,
            controller: function ($scope) {
                this.headerFn = undefined;
                this.footerFn = undefined;
            },
            link: function(scope, element, attrs, autoformCtrl) {
                var jqForm = element.find('form');
                autoformCtrl.headerFn && autoformCtrl.headerFn(scope, function(clonedTranscludedContent) {
                    jqForm.prepend(clonedTranscludedContent);
                });
                autoformCtrl.footerFn && autoformCtrl.footerFn(scope, function(clonedTranscludedContent) {
                    jqForm.append(clonedTranscludedContent);
                });
            }
        };
    })
    .directive('autoformField', function () {
        return {
            restrict: 'EA',
            scope: {
                desc: '=',
                object: '='
            },
            templateUrl: 'autoform-field.html'
        };
    })
    .directive('autoformHeader', function () {
        return {
            restrict: 'EA',
            scope: {
            },
            transclude: 'element',
            require: '^autoform',
            link: function (scope, element, attrs, autoformCtrl, transcludeFn) {
                autoformCtrl.headerFn = transcludeFn;
            }
        };
    })
    .directive('autoformFooter', function () {
        return {
            restrict: 'EA',
            scope: {
            },
            transclude: 'element',
            require: '^autoform',
            link: function (scope, element, attrs, autoformCtrl, transcludeFn) {
                autoformCtrl.footerFn = transcludeFn;
            }
        };
    })

