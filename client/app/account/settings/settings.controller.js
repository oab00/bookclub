'use strict';

angular.module('bookclubApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};

    var infos = ['firstName', 'lastName', 'city', 'state'], info, updatedUser;

    $scope.user = Auth.getCurrentUser();
    for (info in infos) {
      $scope[infos[info]] = $scope.user[infos[info]];
    }

    $scope.infoSuccess = false;

    $scope.changeInfo = function() {
      updatedUser = {};

      for (info in infos) {
        if ($scope[infos[info]] === '' || $scope[infos[info]] === undefined) {
          console.log(infos[info], 'is empty.');
          return;
        }
        updatedUser[infos[info]] = $scope[infos[info]];
      }
      
      $http.put('/api/users/' + $scope.user._id + '/info', updatedUser)
          .success(function() {
            $scope.infoSuccess = true;
          }).error(function(err) {
            console.log('error!', err);
          });     
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
