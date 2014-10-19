'use strict';

angular.module('autoform', ['ngMessages', 'ngAnimate'])

    .directive('autoform', function ($injector) {
         return {
             restrict: 'AE',
             templateUrl: 'templates/autoform.html',
             transclude: true,
             scope: {
                 model: '=',
                 editable: '='
             },
             controller: function ($scope) {
                 this.isEditable = function () {
                     return $scope.editable;
                 };
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
            },
            require: '^autoform',
            link: function (scope, element, attrs, ctrl) {
                scope.isEditable = function () {
                    return ctrl.isEditable();
                };
            }
        };
    })

    .directive('rating', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            templateUrl: 'templates/rating.html',
            scope: {},
            link: function (scope, element, attrs, ngModel) {
                scope.values = [1, 2, 3, 4 , 5];
                scope.setValue = function (value) {
                    scope.currentValue = value;
                    // Update ngModel value
                    ngModel.$setViewValue(value);
                };
            }
        };
    });