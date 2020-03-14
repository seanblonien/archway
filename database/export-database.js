/**
 * Script that export the Strapi database from the database Docker container
 * that is running.
 *
 * Stores the database dump in the local directory as a zip file that can be
 * later used for importing to another database instance.
 */
/* eslint-disable no-console */
const path = require('path');
const execShellCommand  = require('./execShellCommand.js');

const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  // Verify a filename was provided
  if(process.argv.length < ARGV_REQUIRED_LENGTH){
    console.error('Please provide a filename for the database export.');
    return;
  }
  const fileName = process.argv[ARGV_INDEX_FILE_PATH];

  try {
    // Delete any dump directory on the container
    await execShellCommand('docker exec database rm -rf /dump');
    // Delete the dump zip file if on container
    await execShellCommand('docker exec database rm -f /dump.zip');
    // Perform the data dump of the Strapi database
    await execShellCommand('docker exec database mongodump -o /dump --quiet --uri "mongodb://root:capstone@database:27017/strapi?authSource=admin"');
    // Compress the database dump into one zip file
    await execShellCommand('docker exec database zip -r /dump.zip /dump');
    // Copy the dump zip file over to the local directory
    await execShellCommand(`docker cp database:/dump.zip "${path.resolve(__dirname, fileName)}"`);

    console.log('Database export successful!');
  } catch(e){
    // Log the error to console
    console.error(e);
  }
})();
