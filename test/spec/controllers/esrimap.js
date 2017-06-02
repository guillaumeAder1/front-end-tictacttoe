'use strict';

describe('Controller: EsrimapCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var EsrimapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EsrimapCtrl = $controller('EsrimapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EsrimapCtrl.awesomeThings.length).toBe(3);
  });
});
