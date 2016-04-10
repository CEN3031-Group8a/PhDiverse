'use strict';

module.exports = function (app) {
  // Invite Routes
  var invite = require('../controllers/invite.server.controller');
  // Setting up the invite api
  app.route('/api/invite').post(invite.sendMail);
};