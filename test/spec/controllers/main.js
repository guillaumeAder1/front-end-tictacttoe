'use strict';

describe('Controller:MainCtrl', function() {

    // load the controller's module
    beforeEach(module('frontendApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, socketIO) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            //io: socketIO.connect()
            // place here mocked dependencies
        });
    }));

    it('controller is loaded properly', function() {
        expect(MainCtrl).not.toBe(null);
        console.log("************** IS socket IO loaded ***********************");
        console.log(MainCtrl.io);
        expect(MainCtrl.io).not.toBe(null);
    });


});