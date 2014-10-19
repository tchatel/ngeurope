describe("directives", function () {

    var descFieldText = {"property": "p1", "label": "label1", "type": "text", "constraints": {}};
    var descFieldCheckbox = {"property": "p2", "label": "label2", "type": "checkbox", "constraints": {} };
    var descFieldSelect = {"property": "p3", "label": "label3", "type": "select", "list": {"A": "aaa", "B": "bbb"}};
    var descFieldEmail = {"property": "p4", "label": "label4", "type": "email", "constraints": {"required": true}};
    var descForm = {
        "fields": [descFieldText, descFieldCheckbox, descFieldSelect, descFieldEmail]
    };

    var jq = angular.element;

    beforeEach(module('templates'));
    beforeEach(module('autoform'));

    describe("autoform directive", function () {

        it("should create a form row for each field", function () {
            inject(function ($compile, $rootScope) {
                var template = '<autoform desc="desc" model="obj">Entête</autoform>';
                var scope = $rootScope.$new();
                scope.desc = descForm;
                var autoform = $compile(template)(scope); // Compiles the template and links it to the scope
                scope.$digest(); // Needed to update the directives templates
                expect(autoform.find('autoformfield').length).toEqual(4);
            });
        });

    });

    describe("autoformfield directive", function () {
        var scope, html;
        beforeEach(function () {
            inject(function ($compile, $rootScope) {
                scope = $rootScope.$new();
                html = $compile('<autoform desc="desc" model="obj">Entête</autoform>')(scope);
            });
        });

        it ("should generate a text input field", function () {
            inject(function ($compile, $rootScope) {
                scope.desc = {"fields": [descFieldText]};
                scope.$digest(); // Needed to update the directive template
                expect(html.find('autoformfield').find('input').attr('ng-model')).toEqual('model[desc.property]');
            });
        });

        it ("should generate a checkbox", function () {
            inject(function ($compile, $rootScope) {
                scope.desc = {"fields": [descFieldCheckbox]};
                scope.$digest(); // Needed to update the directive template
                expect(html.find('autoformfield').find('input').attr('type')).toEqual('checkbox');
            });
        });

        it ("should generate an email input field", function () {
            inject(function ($compile, $rootScope) {
                scope.desc = {"fields": [descFieldEmail]};
                scope.$digest(); // Needed to update the directive template
                expect(html.find('autoformfield').find('input').attr('type')).toEqual('email');
            });
        });

        it ("should generate a checkbox", function () {
            inject(function ($compile, $rootScope) {
                scope.desc = {"fields": [descFieldSelect]};
                scope.$digest(); // Needed to update the directive template
                var options = html.find('autoformfield').find('select').find('option');
                expect(options.length).toEqual(3);
                var optionA = jq(options[1]);
                var optionB = jq(options[2]);
                expect(optionA.attr('value')).toEqual('A');
                expect(optionA.text()).toEqual('aaa');
                expect(optionB.attr('value')).toEqual('B');
                expect(optionB.text()).toEqual('bbb');
            });
        });

    });

});