'use strict';

// Configure the 'chat' module routes
angular.module('invite').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('invite', {
        url: '/invite',
        templateUrl: 'modules/invite/client/views/invite.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
