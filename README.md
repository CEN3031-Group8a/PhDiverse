# PhDiverse

PhDiverse is a professional community built for PhD's of diverse backgrounds.

## Link to Deployed Page
https://phdiverse.herokuapp.com/

## Borrowed Code and APIs 
* Bootstrap
* LinkedIn
* Nodemailer
* Mailgun
* mLab
* Express
* Angular.js
* Node.js

## Project Features
* Landing Page:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/SplashPage.JPG)

* Login Page:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/SignInPage.JPG)

* User Feed:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/UserFeed.JPG)

* Profile Page:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/ProfilePage.JPG)

* User Posts:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/UserPosts.JPG)

* Curriculum Vitae Upload:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/CVUpload.JPG)

* Edit Profile:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/EditProfile.JPG)

* Publication and Video Links:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/UserLinks.JPG)

* Invite New Members:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/InviteNewMembers.JPG)

* Administrator Edits:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/AdminEdits.JPG)

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/AdminPrivileges.JPG)

* User Search:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/UserSearch.JPG)

* Connection Requests:

![alt tag](https://github.com/CEN3031-Group8a/PhDiverse/blob/Development/final%20screenshots/ConnectionRequests.JPG)

## Running the Project Locally
* In order to run the project locally, the user should clone this repository to a local folder. After opening a command shell, the user should run npm install to make sure all of the modules for MEAN.JS are updated.
* Next, the user should type "npm install nodemailer" into the command shell to install the necessary module for sending administrative email invitations.
* Finally, the user should type "grunt" into the command shell. When the user navigates to http://localhost:3000/ in a browser, the website should appear and be running.

## Updating the Database Connection
* When running the website locally, one should modify the file called "mean/config/env/local.js" and enter the database's URI in this entry:
** db: {
    uri: <your URI goes here>,
    options: {
      user: '',
      pass: ''
    }
  }
* When running the website on Heroku, one should ensure the file called "mean/config/env/production.js" looks as it does below:
** db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  }
** Next, one should navigate to the app's Settings page on Heroku.com and change the Config Variable called "MONGOLAB_URI" to the desired database's URI.
