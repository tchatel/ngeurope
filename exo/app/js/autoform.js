'use strict';

angular.module('autoform', ['ngMessages', 'ngAnimate'])

    .directive('autoform', function ($injector) {
         return {
             restrict: 'AE',
             templateUrl: 'templates/autoform.html',
             transclude: true,
             scope: {
                 model: '='
             },
             link: function (scope, element, attrs) {
                 if (attrs.service) {
                     var loader = $injector.get(attrs.service);
                     loader().then(function (desc) {
                         scope.desc = desc;
                     });
                 } else {
                     // Allow usage without service name, taking the description from the 'desc' attribute
                     // The $watch must watch in parent (non isolated) scope.
                     scope.$parent.$watch('desc', function (desc) {
                         scope.desc = desc;
                     });
                 }
             }
         };
    })

    .directive('autoformfield', function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/autoformfield.html',
            scope: {
                desc: '=',
                model: '='
            }
        };
    })

    .directive('rating', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            replace: true,
            templateUrl: 'templates/rating.html',
            scope: {
                values: '=',
                default: '='
            },
            link: function (scope, element, attrs, ngModel) {
                scope.setValue = function (val) {
                    scope.val = val;
                    // Update ngModel value
                    ngModel.$setViewValue(val);
                };

                scope.setValue(ngModel.$modelValue > 0 ? ngModel.$modelValue : scope.default);
            }
        };
    });