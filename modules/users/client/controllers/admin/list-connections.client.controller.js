'use strict';

/* eslint no-multi-spaces:0, indent:0 */
angular.module('users.admin').controller('UserConnectionsController', ['$scope', '$filter', 'Admin', 'Authentication',
  function ($scope, $filter, Admin, Authentication) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });
	
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
	  Authentication.user.connections.forEach(function(entry) {
		$scope.users = $filter('filter')($scope.users, {
			$: entry
		});
	  });
	  $scope.users = $filter('filter')($scope.users, {
			_id: '!' + Authentication.user._id
	  });
	  console.log('$scope.users: ',$scope.users);
	  $scope.filteredItems1 = $filter('filter')($scope.users, {
		displayName: $scope.search
      });
	  $scope.filteredItems2 = $filter('filter')($scope.users, {
		email: $scope.search
      });
      $scope.filteredItems3 = $filter('filter')($scope.users, {
		username: $scope.search
      });
	  if($scope.filteredItems1.length >= $scope.filteredItems2.length && $scope.filteredItems1.length >= $scope.filteredItems3.length){
		  $scope.filteredItems = $scope.filteredItems1;
	  }
	  else if($scope.filteredItems2.length >= $scope.filteredItems1.length && $scope.filteredItems2.length >= $scope.filteredItems3.length){
		  $scope.filteredItems = $scope.filteredItems2;
	  }
	  else{
		  $scope.filteredItems = $scope.filteredItems3;
	  }
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
