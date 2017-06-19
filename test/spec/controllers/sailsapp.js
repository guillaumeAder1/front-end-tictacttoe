'use strict';

describe('Controller: SailsappCtrl', function() {

    // load the controller's module
    beforeEach(module('frontendApp'));

    var SailsappCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        SailsappCtrl = $controller('SailsappCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should load controller as expected', function() {
        expect(SailsappCtrl).not.toBe(null);
        expect(SailsappCtrl.io).not.toBe(null);
    });
});