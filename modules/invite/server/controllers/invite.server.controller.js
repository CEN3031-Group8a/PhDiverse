'use strict';
 /* eslint no-multi-spaces:0, indent:0 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
	auth: {
	 user: 'postmaster@sandbox97a2e5138c3e48169a39e01a85feda91.mailgun.org',
	 pass: '1004156bbd690b933ed3e66f3577b576'   
	}
});

/*
var data = req.body;
var mailOpts = {

	from: 'sandbox97a2e5138c3e48169a39e01a85feda91.mailgun.org',
	to: 'data.email',
	subject: 'Invite from PhDiverse!',
	text : 'test message form mailgun',
	html : '<b>test message form mailgun</b>'
};

transporter.sendMail(mailOpts, function (err, response) {
	if (err) {
	 console.log(err);
	} else {
	 console.log('Mail send');
	}
});
*/

var User = require('../../../users/server/models/user.server.model').User;

//Function to send the mail
exports.sendMail = function (req, res) {
	//Define request body as data
	var data = req.body;
	//Define the mail options from the data file
	var mailOpts = {
		from: 'sandbox97a2e5138c3e48169a39e01a85feda91.mailgun.org',
		to: data.inviteEmail,
		subject: 'Invitation from PhDiverse!',
		text : data.inviteMessage,
//        html : '<p>Hello! You\'ve been invited to PhDiverse! <a href="http://localhost:3000/authentication/signup">Link to sign up!</a></p>'
		html : '<p>' + data.inviteMessage + '</p><p>Username: ' + data.username + '</p><p>Password: ' + data.password + '</p><p>Signin <a href="http://localhost:3000/authentication/signin">here</a> to get started!</p>'
	};

	//Save a "temporary user" entry into the corresponding database
	var invitee = new User({
		provider: 'local',
		email: data.inviteEmail,
		username: data.username,
		password: data.password,
		firstName: data.username,
		lastName: data.username,
		created: Date.now()
	});
	invitee.save(function (err, invitee) {
		if (err) {
			return console.error(err);
		}
		//Use defined transporter to send mail with mail options
		transporter.sendMail(mailOpts, function (err, response) {
			if (err) {
				console.log(err);
			} else {
				console.log('Mail sent');
			}
		});
	});
};

/*exports.sendMail = function(req, res) {
 
	var data = req.body;
 
	transporter.sendMail({
		from: 'noreply@phdiverse.com',
		to: data.email,
		subject: 'Invite from PhDiverse!',
		text: data.contactMsg
	});
 
	res.json(data);
};*/