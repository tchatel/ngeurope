'use strict';

angular.module('autoform', ['ngMessages', 'ngAnimate'])

    .directive('autoform', function () {
         return {
             restrict: 'AE',
             scope: false

         };
    })