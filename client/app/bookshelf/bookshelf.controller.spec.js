'use strict';

describe('Controller: BookshelfCtrl', function () {

  // load the controller's module
  beforeEach(module('bookclubApp'));

  var BookshelfCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookshelfCtrl = $controller('BookshelfCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
