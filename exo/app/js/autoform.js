'use strict';

angular.module('autoform', ['ngMessages', 'ngAnimate'])

    .directive('autoform', function () {
         return {
             restrict: 'AE',
             templateUrl: 'templates/autoform.html',
             transclude: true,
             scope: {
                 desc: '=',
                 model: '='
             }

         };
    })