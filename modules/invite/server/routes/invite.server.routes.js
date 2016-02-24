'use strict';

module.exports = function (app) {
  // Invite Routes
  var invite = require('../controllers/invite.server.controller');

  // Setting up the users profile api
  app.route('/invite').post(invite.sendMail);
};