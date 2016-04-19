'use strict';
/* eslint no-multi-spaces:0, indent:0 */
// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
      .state('profile', {
        url: '/profile/:profileId',
        templateUrl: 'modules/users/client/views/profile/profile.client.view.html'
      })
      .state('settings.profile', {
        url: '/edit-profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
  	  .state('settings.picture', {
  		  url: '/picture',
  		  templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
  	  })
  	  .state('settings.currvit', {
        url: '/curriculumvitae',
        templateUrl: 'modules/users/client/views/settings/change-curriculum-vitae.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
      .state('settings.add-connections', {
        url: '/add-connections',
        templateUrl: 'modules/users/client/views/admin/add-connections.client.view.html',
        data: {
          roles: ['user', 'admin', 'recruiter']
        }
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        /* Signup page only allowed for logged-in admins - essentially it's disabled.
         * WARNING: SIGNUP PAGE ALLOWS FOR USERS TO SELECT THEIR ROLE, INCLUDING ADMIN!
         * DO NOT REENABLE IN DEPLOYMENT UNTIL THE ROLE SELECTION FIELD GETS REMOVED.
         * Enable signup page by removing these next 3 lines of code. */
        data: {
          roles: ['admin']
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);
