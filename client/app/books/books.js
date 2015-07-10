'use strict';

angular.module('bookclubApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/books', {
        templateUrl: 'app/books/books.html',
        controller: 'BooksCtrl'
      });
  });
