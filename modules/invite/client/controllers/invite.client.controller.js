'use strict';
/* eslint no-multi-spaces:0, indent:0 */
// Articles controller
angular.module('invite').controller('InviteController', ['$scope', '$stateParams', '$http', '$state',
  function ($scope, $stateParams, $http, $state) {
    

    // Send an invite email
    $scope.sendMail = function () {
          //Create email data
          var data = ({
            inviteEmail: $scope.inviteEmail,
            inviteMessage: 'You have been invited to PhDiverse! Here is a signup link to get started:',
          });
    
          //Post request (pass data) ***Check on api/invite (in router?)
          $http.post('/invite', data).success(function (response) {
            //Return to previous page or home on success
            $state.go($state.previous.state.name || 'home', $state.previous.params);
          }).error(function (response) {
            $scope.error = response.message;
          });
        $scope.inviteEmail = '';   
    };
  
  }
]);
