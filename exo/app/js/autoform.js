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
                 this.moveFieldUp = function (fieldDesc) {
                     var index = $scope.desc.indexOf(fieldDesc);
                     if (index > 0) {
                         swap($scope.desc, index, index - 1);
                     }
                 };
                 this.moveFieldDown = function (fieldDesc) {
                     var index = $scope.desc.indexOf(fieldDesc);
                     if (index < $scope.desc.length - 1) {
                         swap($scope.desc, index, index + 1);
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
            }
        };
    })