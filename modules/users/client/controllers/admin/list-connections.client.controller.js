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
	  $scope.filteredConns = function () {
		return $scope.users.filter(function (user) {
		  return Authentication.user.connections.indexOf(user._id) !== -1;
		});
	  };
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);