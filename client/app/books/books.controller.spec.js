'use strict';

describe('Controller: BooksCtrl', function () {

  // load the controller's module
  beforeEach(module('bookclubApp'));

  var BooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BooksCtrl = $controller('BooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
