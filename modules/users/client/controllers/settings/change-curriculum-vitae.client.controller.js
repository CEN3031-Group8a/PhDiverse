'use strict';
/* eslint indent:0 */
angular.module('users').controller('ChangeCurriculumVitaeController', ['$scope', '$timeout', '$http', '$window', 'Authentication', 'FileUploader', '$sce',
  function ($scope, $timeout, $http, $window, Authentication, FileUploader, $sce) {
    $scope.user = Authentication.user;
    $scope.curriculumVitaeURL = $scope.user.curriculumVitaeURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/curriculumvitae',
      alias: 'newCurriculumVitae'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'currVitFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
		$scope.fileDisplayName = item.name;
        return '|pdf|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);
        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.curriculumVitaeURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };
	
    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user curriculum vitae
    $scope.uploadCurriculumVitae = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.curriculumVitaeURL = $scope.user.curriculumVitaeURL;
    };
  }
]);
