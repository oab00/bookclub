'use strict';

angular.module('bookclubApp')
  .controller('BookshelfCtrl', function ($scope, $http, $location, Auth) {

  	if (!Auth.isLoggedIn()) {
  		$location.path('/login');
  		setTimeout(function() { alert('You need to login!');}, 100);
  	}
    
    $scope.searchBooks = function() {
    	$scope.searched = false;
    	$scope.books = [];

		if ($scope.searchInput === '') {
			$scope.searched = true;
    		return;
    	}
		$scope.searchInput = $scope.searchInput.replace(/[?&=\/]/g, '').replace(' ', '+');

		$http.get('/api/books/search/' + $scope.searchInput)
			.success(function(data) {
				$scope.searched = true;
				$scope.books = data.data.map(function(book) {
					return {
						name: book.title,
						img: book.thumbnail
					};
				}).filter(function(book) {
					return (book.img !== undefined);
				});
			});
	};

	$scope.addBook = function(index) {
		$http.post('/api/books', {
				name: $scope.books[index].name,
				img: $scope.books[index].img,
				user: $scope.user
			}).success(function(data) {
				$scope.myBooks.push(data);
			}).error(function(err) {
				// book already exists in user's bookshelf
				alert('Book is already in your bookshelf!');
			});

		// TODO: take out the add button or include something to tell
		// 		 that the user already added said book
	};

	$scope.removeBook = function(index) {
		$http.delete('/api/books/' + $scope.myBooks[index]._id);
		$scope.myBooks.splice(index, 1);
	};

	$scope.getMyBooks = function() {
		$http.get('/api/books/user/' + $scope.user._id)
			.success(function(data) {
				$scope.myBooks = data;
			});
	};

	$scope.gotoEdit = function() {
		$location.path('/settings');
	};

	$http.get('/api/users/me').success(function(data) {
		$scope.user = data;
	});
	$scope.user = Auth.getCurrentUser();
	
	$scope.getMyBooks();
	$scope.searchInput = '';
	$scope.searched = false;

	// example
	$scope.books = [{
		  	name: 'Hello Cruel World',
		  	img: 'http://books.google.com/books/content?id=yhSabBV3ldoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
		}, {
			name: 'Kitty Cat and Fat Cat',
			img: 'http://books.google.com/books/content?id=TtGZ_6HySsAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
		}, {
			name: 'بازیگران عصر طلایی',
			img: 'http://books.google.com/books/content?id=evG_AwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
		}];
	
	$scope.books = [];

  });
