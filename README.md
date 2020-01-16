# Section02-Group01

## Project Structure

### Front-End

Cappy's front-end consists of a React.js application.  The source code for the
front end is stored in the src/ directory of the root project repository.  The primary
App.js file is located here, and this file defines the primary routing system for the
whole web-application.  Auth.js is a utility that defines behaviors used in authenticating
users for access to protected routes.

There are 3 subdirectories of src/ that contain relevant files that contain the following:

    Components -- Front end design elements that appear visually.
    Images -- Image files that are used to decorate the front-end.
    Pages -- Contains the React.js files that define the pages as they
             appear to the user.
             
### Back-End

Cappy's backend consists of an instance of Strapi.io running on top of a MongoDB database
instance.  These are both run out of docker containers, and provide a persistent data
store with which Cappy's front-end may interact.  Strapi.io provides an API for to mediate
this access, and even provides the API calls for dynamically configurable types, so site
admins who are managing Cappy can even get creative and make new content types if they wish.

## Installation Guide

1. Move the following files to your project root directory: ~/StartupScripts/users.json ~/StartupScripts/roles.json ~/StartupScripts/perms.json ~/StartupScripts/importPermissions.bash
2. Make any customizations to your website:

* Change the color theme on your site to match your school's colors. This value is found in constants.js. These colors are represented by hex values. If you're having trouble finding the correct color there are many sites which can help find your desired hex values: https://htmlcolorcodes.com/
* Upload a picture for the background of the homepage of your website. Use a high resolution picture. If you only have a local version of the image upload it to a site like imgur.com so you can link to the picture.
* Change the name of your university in constants.js
3. Change the IP address in constants.js to the server where the backend is hosted followed by port number 1337. example: 192.168.3.114.1337
4. Run the powershell script inside your project directory: runImportPermissionsScript.ps1