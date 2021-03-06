'use strict';

/* eslint no-multi-spaces:0, indent:0 */
angular.module('users.admin').controller('RequestListController', ['$scope', '$filter', 'Admin', 'Authentication', 'Users', '$state',
  function ($scope, $filter, Admin, Authentication, Users, $state) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });
	$scope.currUser = Authentication.user;
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
	
	$scope.figureOutItemsToDisplay = function () {
	  $scope.pagedItems = $scope.users.filter(function (user) {
		  return Authentication.user.requests.indexOf(user._id) !== -1;
	  });
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
	
	$scope.add = function (user) {
		var userUpdate1 = new Users($scope.currUser);
		var userUpdate2 = new Users(user);
		userUpdate1.connections.push(userUpdate2._id);
		userUpdate1.requests.splice(userUpdate1.requests.indexOf(userUpdate2._id), 1);
		userUpdate2.connections.push(userUpdate1._id);
		userUpdate2.requests.splice(userUpdate2.requests.indexOf(userUpdate1._id), 1);
		userUpdate1.$update();
		userUpdate2.$update();
		$scope.buildPager();
    };
	
	$scope.remove = function (user) {
		var userUpdate = new Users($scope.currUser);
		userUpdate.requests.splice(userUpdate.requests.indexOf(user._id), 1);
		userUpdate.$update();
		$scope.buildPager();
    };
  }
]);
