'use strict';

angular.module('bookclubApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};

    var infos = ['firstName', 'lastName', 'city', 'state'], info, updatedUser,
        infoPrompts = ['First Name', 'Last Name', 'City', 'State'];

    $scope.user = Auth.getCurrentUser();
    for (info in infos) {
      $scope[infos[info]] = $scope.user[infos[info]];
    }

    $scope.infoSuccess = false;
    $scope.infoAlert = false;

    $scope.changeInfo = function() {
      updatedUser = {};

      for (info in infos) {
        if ($scope[infos[info]] === '' || $scope[infos[info]] === undefined) {
          $scope.infoError = infoPrompts[info];
          $scope.infoAlert = true;
          return;
        }
        updatedUser[infos[info]] = $scope[infos[info]];
      }
      $scope.infoAlert = false;

      $http.put('/api/users/' + $scope.user._id + '/info', updatedUser)
          .success(function() {
            $scope.infoSuccess = true;
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
