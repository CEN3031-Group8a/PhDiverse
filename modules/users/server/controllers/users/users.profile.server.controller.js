'use strict';

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

  //console.log(user);

  //Find unupdated version of user by their ID for comparison purposes
  User.findById(oldID, function(err, user) {
    if (err) throw err;

    // show the one user
    oldUser = user;
    //console.log('********************************************************');
    console.log(user);
  });

  //Use differences library to determine differnces between old user and updated version
  /*var callback = function(){
    console.log('********callback did something');
    var differences = diff(oldUser, user);
    console.log(differences);
  };
  */



  // For security measurement we remove the roles from the req.body object
  //delete req.body.roles;

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
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  /* Find unupdated version of user by their ID for comparison purposes
  User.findById(oldID, function(err, user) {
    if (err) throw err;

    // show the one user
    updatedUser = user;
    console.log('********************************************************');
    console.log(user);
  });
  */

  function asyncCheck() {
    User.findById(oldID, function(err, user) {
      if (err) throw err;

      // show the one user
      updatedUser = user;
      console.log('********************************asyncCheck was called!');
      console.log(user);
    });
  };

  //Deterimine differences 
  var differences = asyncCheck.then(diff(oldUser, updatedUser));
  console.log(differences);
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
 * Update profile picture
    May require tweaking to change includes
 
 exports.userByUsername = function(req, res, next, username) {
  User.findOne({username: username}).exec(function(err, user){
    if(err) return next(err);
    if(!user) return next(new Error('Failed to load User ' + username));
    req.user = user;
    next();
  });
 };
 */

/**
 * Send User
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};
