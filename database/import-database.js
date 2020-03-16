/**
 * Script that imports the Strapi database from a locally stored zip file
 * (generated from the export-database.js) into a locally running Docker
 * container.
 *
 * Note: drops any pre-existing collection if a collection being imported has
 * the same name. Will not delete or modify collections that are not imported.
 */
/* eslint-disable no-console */
const path = require('path');
const execShellCommand = require('./execShellCommand.js');

const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  // Verify a filename was provided
  if(process.argv.length < ARGV_REQUIRED_LENGTH) {
    console.error('Please provide a filename for the database import.');
    return;
  }
  const fileName = process.argv[ARGV_INDEX_FILE_PATH];

  try {
    // Delete any dump directory on the container
    await execShellCommand('docker exec database rm -rf /dump');
    // Delete the dump zip file if on container
    await execShellCommand('docker exec database rm -rf /dump.zip');
    // Copy the dump zip file over to the container
    await execShellCommand(`docker cp "${path.resolve(__dirname, fileName)}" database:/dump.zip`);
    // Unzip the dump zip into a directory
    await execShellCommand('docker exec database unzip /dump.zip -d /');
    // Perform the data dump import of the Strapi database
    await execShellCommand('docker exec database mongorestore --uri "mongodb://root:capstone@database:27017/?authSource=admin" --drop -d strapi /dump/strapi');

    console.log('Database import successful!');
  } catch(e) {
    // Log the error to console
    console.error(e);
  }
})();
