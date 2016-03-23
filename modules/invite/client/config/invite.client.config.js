'use strict';

// Configuring the Invite module
angular.module('invite').run(['Menus',
  function (Menus) {
    // Set topbar item for invite
    Menus.addMenuItem('topbar', {
      title: 'Invite New Member',
      state: 'invite',
      roles: ['admin']
    });
  }
]);
