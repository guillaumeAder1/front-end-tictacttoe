'use strict';

describe('Controller: SailsappCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var SailsappCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SailsappCtrl = $controller('SailsappCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SailsappCtrl.awesomeThings.length).toBe(3);
  });
});
