'use strict';

angular.module('bookclubApp')
  .controller('BooksCtrl', function ($scope, $http, Auth, $location) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
      setTimeout(function() { alert('You need to login!');}, 100);
    }

    
  	$scope.getAllBooks = function() {
  		$http.get('/api/books/')
  			.success(function(data) {
  				allBooks = data;
  				$scope.books = data;
  				$scope.getUsers();
  			});
  	};

  	$scope.getUsers = function() {
  		/*
			all this because of admin permissions?
			trying to remove duplicates in an array of objects

			P.S. could filter user._id then GET each user from database
  		*/
  		// TODO: make this better

  		var whatever = ' /-;(|secrty!Stuff;)|-/ ';

  		var users = $scope.books.map(function(book) {
  			return book.user.name + whatever + book.user.email;
  		});

  		users = users.filter(function(user, index) {
  			return users.indexOf(user) == index; 
  		});

  		users = users.map(function(user) {
  			user = user.split(whatever);
  			return {
  				name: user[0],
  				email: user[1]
  			};
  		});

  		$scope.users = users;
  	};

  	$scope.filterBooks = function(index) {
  		$scope.books = allBooks;
  		$scope.filtered = true;

  		$scope.books = $scope.books.filter(function(book) {
  			if (book.user.email === $scope.users[index].email) {
  				return true;
  			}
  			return false;
  		});
  	};

  	$scope.reset = function() {
  		$scope.filtered = false;
  		$scope.books = allBooks;
  	};

  	var allBooks = [];
  	$scope.filtered = false;

  	$scope.getAllBooks();
  });
