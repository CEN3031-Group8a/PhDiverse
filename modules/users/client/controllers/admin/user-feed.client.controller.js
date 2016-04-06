'use strict';

/* eslint no-multi-spaces:0, indent:0 */
angular.module('users.admin').controller('UserFeedController', ['$scope', '$filter', 'Admin', 'Authentication',
  function ($scope, $filter, Admin, Authentication) {
    Admin.query(function (data) {
      $scope.users = data;
	  //console.log('$scope.users: ',$scope.users);
	  //console.log('$scope.filteredConns($scope.users): ',$scope.filteredConns($scope.users));
      $scope.buildPager();
    });
	
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
	
    $scope.figureOutItemsToDisplay = function () {
	  $scope.filteredConns = $scope.users.filter(function (user) {
		  return Authentication.user.connections.indexOf(user._id) !== -1;
	  });
	  $scope.mergeArrays();
    };
	
	$scope.mergeArrays = function () {
	  $scope.userFeed = [];
	  for (var k in $scope.filteredConns) {
		for (var m in $scope.filteredConns[k].events) {
			if($scope.filteredConns[k].events[m].newValue !== undefined && $scope.filteredConns[k]._id === $scope.filteredConns[k].events[m]._creator){
				$scope.userFeed = $scope.userFeed.concat($scope.filteredConns[k].events[m]);
			}
		}
	  }
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
	
	$scope.getUser = function(userID) {
		if(userID !== undefined){
			var res = $scope.users.filter(function( obj ) {
			  return obj._id === userID;
			});
			return res;
		}
	};
  }
]);