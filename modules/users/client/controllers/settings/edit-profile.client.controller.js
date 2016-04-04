'use strict';

/* eslint no-multi-spaces:0, indent:0 */
angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication', '$window',
  function ($scope, $http, $location, Users, Authentication, $window) {
    $scope.init = function(user) {
		//private constructor for controller
		if(user){
			$scope.user = user;
		}
		else{
			$scope.user = Authentication.user;
		}
	};
	
	

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
	
	$scope.addToPosts = function (newPost, newForm) {
		if(newPost !== '' && typeof newPost !== 'undefined'){
			newPost.authorID = Authentication.user._id;
			$scope.user.posts.push(newPost);
			$scope.newPost = {};
			$scope.updateUserProfile(newForm);
		}
	};
	
	$scope.addToOtherPosts = function (newPost, newForm) {
		if(newPost !== '' && typeof newPost !== 'undefined'){
			newPost.authorID = Authentication.user._id;
			$scope.user.posts.push(newPost);
			$scope.newPost = {};
			var user = new Users($scope.user);
			user.$update(function (response) {
				$scope.$broadcast('show-errors-reset', 'userForm');
				$scope.success = true;
				$window.location.reload(true);
			}, function (response) {
				$scope.error = response.data.message;
			});
		}
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
		$window.location.reload(true);
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);
