'use strict';

/* eslint no-multi-spaces:0, indent:0 */
angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

	$scope.addToPublications = function (newPublication) {
		if(newPublication !== '' && typeof newPublication !== 'undefined'){
			$scope.user.publications.push(newPublication);
			$scope.newPub = {};
		}
	};
	
	$scope.removePublication = function(index){
		$scope.user.publications.splice(index, 1);
	};
	
	$scope.addToVideos = function (newVideo) {
		if(newVideo !== '' && typeof newVideo !== 'undefined'){
			$scope.user.videos.push(newVideo);
			$scope.newVideo = {};
		}
	};
	
	$scope.removeVideo = function(index){
		$scope.user.videos.splice(index, 1);
	};
	
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);