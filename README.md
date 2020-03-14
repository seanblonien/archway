# Archway

## How to Run the Project

The following steps take you through the required steps to install, build, and run the project locally.

1. Download and install [Docker](https://www.docker.com/products/docker-desktop) to your computer (verify with `Docker -v` and `docker-compose -v` in a terminal).
1. Download and install [Node](https://nodejs.org/en/download/) to your computer so tht we can install our node packages (verify with `npm -v` in a terminal).
2. Clone this repository using `git clone <url>` or your favorite git client.
3. In a terminal, navigate to the repository directory that you just cloned.
4. Run `docker-compose build` to build all of the required Docker images for the project.
5. Run `npm install` in the same directory to install all dependencies for the front end app (this is run locally, and not in the container, so that files may be edited in real time and updated in the container).
6. Once that is done, run `docker-compose up` to start all of the Docker containers (database, strapi, and app).
    - NOTE: if this is your first time starting, this may take several minutes.
    - NOTE: windows users may have to type `net stop http` to use port 80

## How to Import Data

There won't be anything in the database or backend yet, so you have to import a schema and data to start off with a running project.

1. Verify you have [Node](https://nodejs.org/en/download/) installed with `node -v` in a terminal.
2. Ensure that the project is running successfully (using previous steps) by seeing this in the Strapi Docker container logs. If you do not see this yet, then it is possible the container is still starting up.
   - ```
     One more thing...
     Create your first administrator 💻 by going to the administration panel at:
     ┌─────────────────────────────┐
     │ http://localhost:1337/admin │
     └─────────────────────────────┘
     ```
    - NOTE: DON'T OPEN YOUR BROWSER YET - the scripts will handle admin account creation for you.
    - NOTE: if this is your first time starting, this may take several minutes.
3. Navigate to the database folder of the project (i.e. `cd database` in project root).
4. Run `node import-strapi.js BaseStrapiExport.json` to import the Strapi schema content types.
5. Run `node import-database.js BaseDatabaseExport.zip` to import the database content that matches the Strapi schema content types.
6. Run `node import-uploads.js BaseUploadsExport.zip` to import the file uploads (i.e. images) into the Strapi container.
7. Launch the Strapi admin panel (i.e. localhost:1337) to see the new content types and imported data! The username is `admin` and the password is `capstone` for the Strapi admin panel.

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
