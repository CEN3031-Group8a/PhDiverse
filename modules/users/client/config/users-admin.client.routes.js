'use strict';
/* eslint no-multi-spaces:0, indent:0 */
// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
	   .state('admin.search', {
        url: '/users-search',
        templateUrl: 'modules/users/client/views/admin/list-users-search.client.view.html',
        controller: 'UserListController',
        data: {
          roles: ['admin']
        }
      })
	  .state('admin.connections', {
        url: '/connections',
        templateUrl: 'modules/users/client/views/admin/list-connections.client.view.html',
        controller: 'UserConnectionsController',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListAdminController',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        },
        data: {
          roles: ['admin']
        }
      });
  }
]);
