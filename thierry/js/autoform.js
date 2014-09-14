'use strict';

angular.module('autoform', ['ngMessages', 'ngAnimate'])
    .directive('autoform', function ($injector) {
        return {
            restrict: 'EA',
            scope: {
                loader: '@',
                name: '@',
                model: '=',
                desc: '=',
                editable: "="
            },
            templateUrl: 'templates/autoform.html',
            transclude: true,
            controller: function ($scope) {
                var fieldControllers = [];
                this.addFieldController = function (ctrl) {
                    fieldControllers.push(ctrl);
                };
                this.formInfo = {
                    isEditable: function () {
                        return $scope.editable;
                    }
                };
                this.fieldTypes = [
                    {type: 'text',      label: "Champ texte"},
                    {type: 'select',    label: "Liste déroulante"},
                    {type: 'number',    label: "Champ nombre"},
                    {type: 'email',     label: "Champ email"},
                    {type: 'url',       label: "Champ URL"},
                    {type: 'checkbox',  label: "Case à cocher"}
                ];
                function swap(array, i, j) {
                    var elem = array[i];
                    array[i] = array[j];
                    array[j] = elem;
                }
                this.moveFieldUp = function (fieldDesc) {
                    var index = $scope.formDesc.indexOf(fieldDesc);
                    if (index > 0) {
                        swap($scope.formDesc, index, index - 1);
                    }
                };
                this.moveFieldDown = function (fieldDesc) {
                    var index = $scope.formDesc.indexOf(fieldDesc);
                    if (index < $scope.formDesc.length - 1) {
                        swap($scope.formDesc, index, index + 1);
                    }
                };
                this.deleteField = function (fieldDesc) {
                    var index = $scope.formDesc.indexOf(fieldDesc);
                    $scope.formDesc.splice(index, 1);
                }
                this.endEditAllFields = function () {
                    angular.forEach(fieldControllers, function (fieldCtrl) {
                        fieldCtrl.endEditField();
                    });
                }
            },
            link: function(scope, element, attrs) {
                // Utilise le service de chargement dont le nom est fourni dans l'attribut 'loader'
                scope.formDesc = scope.desc || [];
                if (scope.loader) {
                    var loader = $injector.get(scope.loader);
                    loader().then(function (desc) {
                        scope.formDesc = desc;
                    });
                }
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
                model: '='
            },
            templateUrl: 'templates/autoform-field.html',
            require: ['^autoform', 'autoformField'],
            controller: function ($scope) {
                this.endEditField = function () {
                    $scope.edit = false;
                };
            },
            link: function (scope, element, attrs, ctrls) {
                var autoformCtrl = ctrls[0],
                    fieldCtrl = ctrls[1];
                autoformCtrl.addFieldController(fieldCtrl);
                scope.formInfo = autoformCtrl.formInfo;
                scope.fieldTypes = autoformCtrl.fieldTypes;
                scope.moveFieldUp = function (fieldDesc) {
                    autoformCtrl.moveFieldUp(fieldDesc);
                };
                scope.moveFieldDown = function (fieldDesc) {
                    autoformCtrl.moveFieldDown(fieldDesc);
                };
                scope.deleteField = function (fieldDesc) {
                    autoformCtrl.deleteField(fieldDesc);
                }
                scope.startEditField = function (fieldDesc) {
                    autoformCtrl.endEditAllFields();
                    scope.edit = true;
                }
                scope.endEditField = function (fieldDesc) {
                    autoformCtrl.endEditAllFields();
                }
            }
        };
    })
    // Directive pour saisir dans un champ texte un contenu JSON, utilisée pour définir la liste des options
    // d'une liste déroulante (en mode édition du formulaire).
    .directive('json', function () {
        return {
            restrict: 'A',
            // Il faut une priorité > 0, car :
            // - les fonctions postLink sont exécutées par ordre inverse de priorité.
            // - le tableau des formatters est parcouru de la fin vers le début.
            // - la directive 'input' pour un type="text" ajoute dans postLink un formatter en fin de tableau
            //   qui fait un toString()
            // Il faut donc une fonction postLink qui s'exécute après celle de la directive 'input', donc une directive
            // plus prioritaire.
            priority: 100,
            scope: false,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    try {
                        ngModelCtrl.$setValidity('json', true);
                        return angular.fromJson(viewValue);
                    } catch (e) {
                        ngModelCtrl.$setValidity('json', false);
                        return undefined;
                    }
                });
                ngModelCtrl.$formatters.push(function (modelValue) {
                    return angular.toJson(modelValue);
                });
            }
        }
    })


