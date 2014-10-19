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
                this.remove = function (fieldDesc) {
                    var index = $scope.desc.fields.indexOf(fieldDesc);
                    $scope.desc.fields.splice(index, 1);
                };
                var editField = null;
                this.startEdit = function (fieldDesc) {
                    editField = fieldDesc;
                };
                this.stopEdit = function () {
                    editField = null;
                };
                this.isEditing = function (fieldDesc) {
                    return editField == fieldDesc;
                };
                this.fieldTypes = [
                    {type: 'text',      label: "Champ texte"},
                    {type: 'select',    label: "Liste déroulante"},
                    {type: 'number',    label: "Champ nombre"},
                    {type: 'email',     label: "Champ email"},
                    {type: 'url',       label: "Champ URL"},
                    {type: 'checkbox',  label: "Case à cocher"}
                ];
                var ctrl = this;
                $scope.add = function () {
                    var newFieldDesc = {};
                    $scope.desc.fields.push(newFieldDesc);
                    ctrl.startEdit(newFieldDesc);
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
                scope.remove = function () {
                    ctrl.remove(scope.desc);
                };
                scope.startEdit = function () {
                    ctrl.startEdit(scope.desc);
                };
                scope.stopEdit = function () {
                    ctrl.stopEdit();
                };
                scope.isEditing = function () {
                    return ctrl.isEditing(scope.desc);
                };
                scope.fieldTypes = ctrl.fieldTypes;
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