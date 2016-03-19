'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
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
