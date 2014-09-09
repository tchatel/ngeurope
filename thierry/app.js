'use strict';

angular.module('app', ['ngMessages'])
    .controller('FormController', function ($scope) {
        $scope.obj = {};
    })
    .directive('autoform', function ($injector) {
        return {
            restrict: 'EA',
            scope: {
                loader: '@',
                name: '@',
                object: '='
            },
            templateUrl: 'autoform.html',
            transclude: true,
            controller: function ($scope) {
                // Je n'ai pas encore trouvé de bonne idée d'utilisation d'un contrôleur partagé
            },
            link: function(scope, element, attrs) {
                // Utilise le service de chargement dont le nom est fourni dans l'attribut 'loader'
                var loader = $injector.get(scope.loader);
                loader().then(function (desc) {
                    scope.desc = desc;
                });
                // Publie le FormController du formulaire dans le scope parent du scope isolé, pour
                // y accéder de l'extérieur de la directive
                if (scope.name) {
                    scope.$parent[scope.name] = scope.form;
                }
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
    .factory('formLoader', function ($http) {
        // Fonction publiée comme service qui renvoie une promesse de description du formulaire
        var descUrl = 'https://api.mongolab.com/api/1/databases/forms/collections/forms/51669d15e4b04a20de65fc58?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i';
        return function () {
            return $http.get(descUrl).then(function (response) {
                return response.data.fields;
            });
        };
    })


