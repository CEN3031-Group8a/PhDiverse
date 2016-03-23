'use strict';
/* eslint no-multi-spaces:0, indent:0 */
/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User'),
  UserEvent = mongoose.model('UserEvent'),
  deep = require('deep-diff'),
  diff = require('deep-diff').diff;


/**
 * Update user details
 */
exports.update = function (req, res) {
  // Init Variables
  var user = req.user;
  var oldID = user._id;
  var oldUser = new User();
  var updatedUser = new User();
  
	function asyncCheck() {
	  // `delay` returns a promise
	  return new Promise(function(resolve, reject) {
		// Only `delay` is able to resolve or reject the promise
		User.findById(oldID, function(err, user) {
		  if (err) throw err;
		  oldUser = user;
		  resolve(7);
		});	
	  });
	}
	
	function findChanges(prevUser, nextUser) {
	  var tempItemChanged;
    var tempNewValue;

	  if(nextUser !== prevUser){
		  if(nextUser.region !== prevUser.region){
			  tempItemChanged = 'region';
        tempNewValue = nextUser.region;
      }
      if(nextUser.bio !== prevUser.bio){
        tempItemChanged = 'biography';
        tempNewValue = nextUser.bio;
      }
      if(nextUser.institution !== prevUser.institution){
        tempItemChanged = 'institution';
        tempNewValue = nextUser.institution;
      }
      if(nextUser.degree !== prevUser.degree){
        tempItemChanged = 'degree';
        tempNewValue = nextUser.degree;
      }
      /*
      if(nextUser.curriculumVitae !== prevUser.curriculumVitae){
        tempItemChanged = 'Curriculum Vitae';
        tempNewValue = nextUser.curriculumVitae;
      }
      if(nextUser.publications !== prevUser.publications){
        tempItemChanged = 'publications';
        tempNewValue = nextUser.publications;
      }
      if(nextUser.videos !== prevUser.videos){
        tempItemChanged = 'videos';
        tempNewValue = nextUser.videos;
      }
      */

      //Create event for saving
      var event1 = new UserEvent({
        _creator: nextUser._id,
        itemChanged: tempItemChanged,
        newValue: tempNewValue,
        dateCreated: Date.now()
      });

      //Save event
      event1.save(function (err) {
        console.log('*Save function did something!*');
        //Save event to user's event array
        nextUser.events.push(event1._id);
        nextUser.save(function (err){
          if(err) console.log(err);
        });
        if (err) console.log(err);
      });
    }
    return;
  }
	  

	asyncCheck().then(function(v) { //asyncCheck() returns a promise
		if (user) {
			// Merge existing user
			user = _.extend(user, req.body);
			user.updated = Date.now();
			user.displayName = user.firstName + ' ' + user.lastName;

			user.save(function (err) {
			  if (err) {
				return res.status(400).send({
				  message: errorHandler.getErrorMessage(err)
				});
			  } else {
				req.login(user, function (err) {
				  if (err) {
					res.status(400).send(err);
				  } else {
					res.json(user);
					updatedUser = user;
					findChanges(oldUser, updatedUser);
				  }
				});
			  }
			});
		  } else {
			res.status(400).send({
			  message: 'User is not signed in'
			});
		  }
	});
};



/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
  var user = req.user;
  var message = null;
  var upload = multer(config.uploads.profileUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        user.profileImageURL = config.uploads.profileUpload.dest + req.file.filename;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);

                //Create event for profile picture creation
                var event1 = new UserEvent({
                  _creator: user._id,
                  itemChanged: 'profile picture',
                  newValue: '',
                  dateCreated: Date.now()
                });

                //Save profile pic event
                event1.save(function (err) {
                  console.log('*Save function did something!*');
                  //Save event to user's event array
                  user.events.push(event1._id);
                  user.save(function (err){
                    if(err) console.log(err);
                  });
                  if (err) console.log(err);
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update curriculum vitae
 */
exports.changeCurriculumVitae = function (req, res) {
  var user = req.user;
  var message = null;
  var upload = multer(config.uploads.profileUpload).single('newCurriculumVitae');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading curriculum vitae'
        });
      } else {
        user.curriculumVitaeURL = config.uploads.profileUpload.dest + req.file.filename;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
                //Create event for CV change
                var event1 = new UserEvent({
                  _creator: user._id,
                  itemChanged: 'Curriculum Vitae',
                  newValue: '',
                  dateCreated: Date.now()
                });

                //Save CV event
                event1.save(function (err) {
                  console.log('*Save function did something!*');
                  //Save event to user's event array
                  user.events.push(event1._id);
                  user.save(function (err){
                    if(err) console.log(err);
                  });
                  if (err) console.log(err);
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Send User
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};
