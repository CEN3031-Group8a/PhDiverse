'use strict';
/* eslint no-multi-spaces:0, indent:0 */
// Articles controller
angular.module('invite').controller('InviteController', ['$scope', '$stateParams', '$http', '$state',
	function ($scope, $stateParams, $http, $state) {

/*		$scope.generateRandomPassphrase = function () {
		  return new Promise(function (resolve, reject) {
			var password = '';
			var repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

			// iterate until the we have a valid passphrase. 
			// NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present.
			while (password.length < 20 || repeatingCharacters.test(password)) {
			  // build the random password
			  password = generatePassword.generate({
				length: Math.floor(Math.random() * (20)) + 20, // randomize length between 20 and 40 characters
				numbers: true,
				symbols: false,
				uppercase: true,
				excludeSimilarCharacters: true,
			  });

			  // check if we need to remove any repeating characters.
			  password = password.replace(repeatingCharacters, '');
			}

			// Send the rejection back if the passphrase fails to pass the strength test
			if (owasp.test(password).errors.length) {
			  reject(new Error('An unexpected problem occured while generating the random passphrase'));
			} else {
			  // resolve with the validated passphrase
			  resolve(password);
			}
		  });
		};
*/
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
