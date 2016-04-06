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
  var oldUser = new User();
  var updatedUser = new User();
  
	function asyncCheck() {
	  // `delay` returns a promise
	  return new Promise(function(resolve, reject) {
		// Only `delay` is able to resolve or reject the promise
		User.findById(req.body._id, function(err, user) {
		  if (err) throw err;
		  oldUser = user;
		  resolve(7);
		});	
	  });
	}

	asyncCheck().then(function(v) { //asyncCheck() returns a promise
		if (user) {
			// Merge existing user
			user = _.extend(user, req.body);
			user.updated = Date.now();
			user.displayName = user.firstName + ' ' + user.lastName;
			
			//Finding differences
			var tempItemChanged;
			var tempNewValue;

		    if((user !== oldUser) && (String(user._id) === String(oldUser._id))){
				var tempEvent;
				if(user.region !== oldUser.region){
					tempItemChanged = 'region';
			        tempNewValue = user.region;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
			    if(user.bio !== oldUser.bio){
					tempItemChanged = 'biography';
					tempNewValue = user.bio;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				if(user.institution !== oldUser.institution){
					tempItemChanged = 'institution';
					tempNewValue = user.institution;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				if(user.degree !== oldUser.degree){
					tempItemChanged = 'degree';
					tempNewValue = user.degree;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				if(user.publications.length > oldUser.publications.length){
					tempItemChanged = 'publications';
					tempNewValue = user.publications[user.publications.length-1].link;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				if(user.videos.length > oldUser.videos.length){
					tempItemChanged = 'videos';
					tempNewValue = user.videos[user.videos.length-1].link;
					tempEvent = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				if(user.posts.length > oldUser.posts.length){
					tempItemChanged = 'posts';
					tempNewValue = user.posts[user.posts.length-1].thought;
					tempEvent = new UserEvent({
						_creator: user.posts[user.posts.length-1].authorID,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(tempEvent);
					user.events.push(tempEvent);
				}
				//Create event for saving
				/*if(tempItemChanged === 'posts'){
					var event1 = new UserEvent({
						_creator: user.posts[user.posts.length-1].authorID,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(event1);
					user.events.push(event1);
				}
				else{
					var event2 = new UserEvent({
						_creator: user._id,
						itemChanged: tempItemChanged,
						newValue: tempNewValue,
						dateCreated: Date.now()
					});
					oldUser.events.push(event2);
					user.events.push(event2);
				}*/
			}
			  
			user.save(function (err) {
			  if (err) {
				return res.status(400).send({
				  message: errorHandler.getErrorMessage(err)
				});
			  } else {
				res.json(user);
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
