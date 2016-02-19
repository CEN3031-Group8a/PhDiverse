angular.module('profiles').controller('ProfilesController', ['$scope', '$location', '$stateParams', '$state', 'Profiles', 
  function($scope, $location, $stateParams, $state, Profiles){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the profiles, then bind it to the scope */
      Profiles.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.profiles = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve profiles!\n' + error;
      });
    };

    $scope.findOne = function() {
      debugger;
      $scope.loading = true;

      /*
        Take a look at 'list-profiles.client.view', and find the ui-sref attribute that switches the state to the view 
        for a single profile. Take note of how the state is switched: 

          ui-sref="profiles.view({ profileId: profile._id })"

        Passing in a parameter to the state allows us to access specific properties in the controller.

        Now take a look at 'view-profile.client.view'. The view is initialized by calling "findOne()". 
        $stateParams holds all the parameters passed to the state, so we are able to access the id for the 
        specific profile we want to find in order to display it to the user. 
       */

      var id = $stateParams.profileId;

      Profiles.read(id)
              .then(function(response) {
                $scope.profile = response.data;
                $scope.loading = false;
              }, function(error) {  
                $scope.error = 'Unable to retrieve profile with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };  

    $scope.create = function(isValid) {
      $scope.error = null;

      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the profile object */
      var profile = {
        name: $scope.name,
		username: $scope.username,
	    password: $scope.password,
	    email: $scope.email,
	    bio: $scope.bio,
	    userType: $scope.userType,
	    region: $scope.region,
	    institution: $scope.institution,
	    degree: $scope.degree
      };

      /* Save the article using the Profiles factory */
      Profiles.create(profile)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('profiles.list', { successMessage: 'Profile succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save profile!\n' + error;
              });
    };

    $scope.update = function(isValid) {
      /*
        Fill in this function that should update a profile if the form is valid. Once the update has 
        successfully finished, navigate back to the 'profile.list' state using $state.go(). If an error 
        occurs, pass it to $scope.error. 
      */
	  
	  $scope.error = null;
	  var id = $stateParams.profileId;
	  if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }
	  var profile = {
        name: $scope.name, 
      };
	  Profiles.update(id, profile)
			  .then(function(response) {
                //if the object is successfully updated redirect back to the list page
                $state.go('profiles.list', { successMessage: 'Profile successfully updated!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to update profile!\n' + error;
              });
    };

    $scope.remove = function() {
      /*
        Implement the remove function. If the removal is successful, navigate back to 'profile.list'. Otherwise, 
        display the error. 
       */
	   
	  $scope.error = null;
	  var id = $stateParams.profileId;
	  Profiles.delete(id)
			  .then(function(response) {
                //if the object is successfully updated redirect back to the list page
                $state.go('profiles.list', { successMessage: 'Profile successfully deleted!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to delete profile!\n' + error;
              });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }
  }
]);