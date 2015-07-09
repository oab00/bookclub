'use strict';

angular.module('bookclubApp')
  .controller('BookshelfCtrl', function ($scope, $http, $location, Auth) {

  	if (!Auth.isLoggedIn()) {
  		$location.path('/login');
  	}
    
    $scope.search = function() {

    	if ($scope.searchInput === '') {
    		return;
    	}

    	$scope.searchInput = $scope.searchInput.replace(/[?&]/g, '').replace(' ', '+');
    	
    	if (false) {
		  	$http.get('https://www.googleapis.com/books/v1/volumes?q=' + $scope.searchInput)
		  		.success(function(data) {
		  			console.log(data);
		  			$scope.books = data.items.map(function(book) {
		  				return {
		  					name: book.volumeInfo.title,
		  					img: book.volumeInfo.imageLinks.smallThumbnail
		  				};
		  			});
		  			console.log($scope.books);
		  		});
		}
		//example
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

	};

	$scope.addBook = function(index) {
		$http.post('/api/books', {
				name: $scope.books[index].name,
				img: $scope.books[index].img,
				user: user
			}).error(function(err) {
				// print already exists
			});
	};

	$scope.getMyBooks = function() {
		// get my books
	};
	
	var user = Auth.getCurrentUser();

	$scope.searchInput = 'ابراهيم دلع';
	$scope.search();

  });
