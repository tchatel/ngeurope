'use strict';

angular.module('app', ['autoform'])
    .controller('AppController', function ($scope) {
        $scope.obj = {};
        $scope.desc = {
            fields: []
        };
    })
    // Service chargeant la description du formulaire en HTTP.
    .factory('formLoader', function ($http) {
        // Fonction publiée comme service qui renvoie une promesse de description du formulaire
        var descUrl = 'data/desc.json';
        return function () {
            return $http.get(descUrl).then(function (response) {
                return response.data.fields;
            });
        };
    })


/*
TODO :
  - utilisation de $parse ?

 */

