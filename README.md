# Archway

## How to Run the Project

1. Download and install [Docker](https://www.docker.com/products/docker-desktop) to your computer (verify with `Docker -v` and `docker-compose -v` in a terminal)
1. Clone this repository to your computer
1. In a terminal, navigate to the repository
1. Run `docker-compose build` to build all of the required Docker images for the project
1. Run `npm install` in the same directory to install all dependencies for the front end app (this is run locally, and not in the container, so that files may be edited in real time and updated in the container)
1. Once that is done, run `docker-compose up` to start all of the Docker containers (database, strapi, and app)

## How to Import Data

There won't be anything in the database or backend yet, so you have to import a schema and data to start off with a running project.

1. Download and install [Node](https://nodejs.org/en/download/) to your computer to run the import scripts (verify with `node -v` in a terminal)
1. Ensure that the project is running successfully (using previous steps) by seeing this in the Strapi Docker container logs. If you do not see this yet, then it is possible the container is still starting up.

    ```
    One more thing...
    Create your first administrator 💻 by going to the administration panel at:
    ┌─────────────────────────────┐
    │ http://localhost:1337/admin │
    └─────────────────────────────┘
    ```

1. Navigate to the database folder of the project (i.e. `cd database` in project root).
1. Run `node import-strapi.js BaseStrapiExport.json` to import the Strapi schema content types.
1. Run `node import-database.js BaseDatabaseExport.zip` to import the database content that matches the Strapi schema content types.
1. Run `node import-uploads.js BaseUploadsExport.zip` to import the file uploads (i.e. images) into the Strapi container.
1. Launch the Strapi admin panel (i.e. localhost:1337) to see the new content types and imported data!

*Why are there 3 separate scripts for this?*

The idea is to give you control over what you import into your project. You can import different exports, schemas, and data depending on what you want to do. use the exporting guide in combination with importing to add, change, modify, and delete anything in the project and have a backup to restore to a stable point if need be.

## How to Export Data

You may be wondering, *where did these 'Base Export' files come anyways*? They came from exporting directly from a running instance of the project already. There are corresponding export scripts that accompany the import scrips used above. Use the export scripts in conjunction with import scripts to manipulate the project schema and data and have a backup to restore the project just in case anything goes wrong.

1. Ensure that the project (i.e. database and strapi containers) is running successfully which can be verified by viewing the container logs.
1. Navigate to the database folder of the project (i.e. `cd database` in project root).
1. Run `node export-strapi.js <filename>` to export all of the current content types in your Strapi container. You must give the export a filename for it to be created. File format is `.json`.
1. Run `node export-database.js <filename>` to export the Strapi database data. You must give the export a filename for it to be created. File format is `.zip`.
1. Run `node export-uploads.js <filename>` to export the Strapi file uploads data (i.e. images for the sponsors or users). You must give the export a filename for it to be created. File format is `.zip`.
1. These three files will be created in the current directory under the given filenames and can be used to in an import on an running instance of the project.

## [OLD] Project Structure

### Front-End

Cappy's front-end consists of a React.js application.  The source code for the front end is stored in the src/ directory of the root project repository.  The primary App.js file is located here, and this file defines the primary routing system for the whole web-application.  Auth.js is a utility that defines behaviors used in authenticating users for access to protected routes.

There are 3 subdirectories of src/ that contain relevant files that contain the following:

    Components -- Front end design elements that appear visually.
    Images -- Image files that are used to decorate the front-end.
    Pages -- Contains the React.js files that define the pages as they appear to the user.
             
### Back-End

Cappy's backend consists of an instance of Strapi.io running on top of a MongoDB database instance.  These are both run out of docker containers, and provide a persistent data store with which Cappy's front-end may interact.  Strapi.io provides an API for to mediate this access, and even provides the API calls for dynamically configurable types, so site admins who are managing Cappy can even get creative and make new content types if they wish.

## Installation Guide

1. Move the following files to your project root directory: ~/StartupScripts/users.json ~/StartupScripts/roles.json ~/StartupScripts/perms.json ~/StartupScripts/importPermissions.bash
2. Make any customizations to your website:

* Change the color theme on your site to match your school's colors. This value is found in constants.js. These colors are represented by hex values. If you're having trouble finding the correct color there are many sites which can help find your desired hex values: https://htmlcolorcodes.com/
* Upload a picture for the background of the homepage of your website. Use a high resolution picture. If you only have a local version of the image upload it to a site like imgur.com so you can link to the picture.
* Change the name of your university in constants.js
3. Change the IP address in constants.js to the server where the backend is hosted followed by port number 1337. example: 192.168.3.114.1337
4. Run the powershell script inside your project directory: runImportPermissionsScript.ps1
