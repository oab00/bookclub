'use strict';

angular.module('bookclubApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookshelf', {
        templateUrl: 'app/bookshelf/bookshelf.html',
        controller: 'BookshelfCtrl'
      });
  });
