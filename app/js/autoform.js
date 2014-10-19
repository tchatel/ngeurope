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
                 function swap(array, i, j) {
                     var elem = array[i];
                     array[i] = array[j];
                     array[j] = elem;
                 }
                 this.moveUp = function (fieldDesc) {
                     var index = $scope.desc.fields.indexOf(fieldDesc);
                     if (index > 0) {
                         swap($scope.desc.fields, index, index - 1);
                     }
                 };
                 this.moveDown = function (fieldDesc) {
                     var index = $scope.desc.fields.indexOf(fieldDesc);
                     if (index < $scope.desc.fields.length - 1) {
                         swap($scope.desc.fields, index, index + 1);
                     }
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
                scope.moveUp = function () {
                    ctrl.moveUp(scope.desc);
                };
                scope.moveDown = function () {
                    ctrl.moveDown(scope.desc);
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