'use strict';
/* eslint no-multi-spaces:0, indent:0 */
// Articles controller
angular.module('invite').controller('InviteController', ['$scope', '$stateParams', '$http', '$state',
	function ($scope, $stateParams, $http, $state) {
		// Send an invite email
		$scope.sendMail = function () {

			// basic creation of a random password
			var tempUsername = Math.random().toString(16).substring(2);
			var tempPassword = Math.random().toString(36).substring(2);

			//Create email data
			var data = ({
				inviteEmail: $scope.inviteEmail,
				inviteMessage: 'You have been invited to PhDiverse! Your temporary username and password combination is listed below.',
				username: tempUsername,
				password: tempPassword
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
