# Archway

## How to Run the Project

The following steps take you through the required steps to install, build, and run the project locally.

1. Download and install [Docker](https://www.docker.com/products/docker-desktop) to your computer (verify with `Docker -v` and `docker-compose -v` in a terminal).
1. Download and install [Node](https://nodejs.org/en/download/) to your computer so tht we can install our node packages (verify with `npm -v` in a terminal).
1. Clone this repository using `git clone <url>` or your favorite git client.
1. In a terminal, navigate to the repository directory that you just cloned.
1. Run `docker-compose build` to build all of the required Docker images for the project.
1. Run `npm install` in the same directory to install all dependencies for the front end app (this is run locally, and not in the container, so that files may be edited in real time and updated in the container).
1. Once that is done, run `docker-compose up` to start all of the Docker containers (database, strapi, and app).
    - NOTE: if this is your first time starting, this may take several minutes.
    - NOTE: windows users may have to type `net stop http` to use port 80

## How to Import Data

There won't be anything in the database or backend yet, so you have to import a schema and data to start off with a running project.

### Basic Import

<details>
<summary>Steps</summary>

1. Verify you have [Node](https://nodejs.org/en/download/) installed with `node -v` in a terminal.
1. Ensure that the project is running successfully (using previous steps) by seeing this in the Strapi Docker container logs. If you do not see this yet, then it is possible the container is still starting up.
    - ```console
      One more thing...
      Create your first administrator 💻 by going to the administration panel at:
      ┌─────────────────────────────┐
      │ http://localhost:1337/admin │
      └─────────────────────────────┘
      ```

    - NOTE: DON'T OPEN YOUR BROWSER YET - the scripts will handle admin account (credentials in last step) creation for you.
    - NOTE: if this is your first time starting, this may take several minutes.
1. Run `npm run import` to import all of the required data for project.
1. Launch the Strapi admin panel (i.e. localhost:1337) to see the new content types and imported data! The username is `admin` and the password is `capstone` for the Strapi admin panel.

</details>

### Advanced Import

If you want more control over what is imported, you can run the specific import scripts to have more control. Why would you want to do this?

- Import different exports/schemas/data during testing
- Avoid overwriting data that is in your database, Strapi, or uploads
- Restore specific backup file

<details>
<summary>Steps</summary>

1. With the project running successfully, navigate to the database folder of the project (i.e. `cd database` in project root).
1. Run `node import-strapi.js <strapi-export-file>` to import a Strapi schema of content types.
1. Run `node import-database.js <database-export-file>` to import the database content that matches the Strapi schema content types.
1. Run `node import-uploads.js <uploads-export-file>` to import the file uploads (i.e. images) into the Strapi container.
1. Each of the scripts take a file as the argument for where to import the data from. These files *must* come from a [data export](#How-to-Export-Data). For example files, see the `BaseExport` files which is what the `npm run import` script uses.

</details>

NOTE: You can run any import over and over again. The Strapi import creates and updates what is needed. The uploads import does not delete any newly added data, it just creates or overwrites files. However, the *database import is a destructive* operation due to the database dump constraints.

## How to Export Data

Once you have the project running locally, you may make changes to the project that will require exporting. Why would you want to do this?

- Create backups and check points
- Persist Strapi content type schema changes in Git
- Persist database changes in Git
- Persist uploads (images) changes in Git
- Manipulate project schema and data without fear of losing something that works

All of the imports use files created by exporting.

### Basic Export

<details>
<summary>Steps</summary>

1. With the project running successfully, in the project directory, run `npm run export` to export all of the current data from Strapi, the database, and the file uploads into their own export files, all named variants of `BaseExport`.
1. Export created! Running `npm run import` will restore/import this export.

</details>

### Advanced Export

<details>
<summary>Steps</summary>

1. With the project running successfully, navigate to the database folder of the project (i.e. `cd database` in project root).
1. Run `node export-strapi.js <filename>` to export all of the current content types in your Strapi container. You must give the export a filename for it to be created. File format is `.json`.
1. Run `node export-database.js <filename>` to export the Strapi database data. You must give the export a filename for it to be created. File format is `.zip`.
1. Run `node export-uploads.js <filename>` to export the Strapi file uploads data (i.e. images for the sponsors or users). You must give the export a filename for it to be created. File format is `.zip`.
1. These three files will be created in the current directory under the given filenames and can be used to in an import on an running instance of the project.

</details>
