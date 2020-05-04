/**
 * Script that imports the Strapi database from a locally stored zip file
 * (generated from the export-database.js) into a locally running Docker
 * container.
 *
 * Note: drops any pre-existing collection if a collection being imported has
 * the same name. Will not delete or modify collections that are not imported.
 */
/* eslint-disable no-console */
const {execShellCommand, parseCmdAndArgs} = require('./execShellCommand');
const s = require('./strapi-scripts');

const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  // Verify a filename was provided
  if(process.argv.length < ARGV_REQUIRED_LENGTH) {
    console.error('Please provide a filename for the database import.');
    process.exit(s.errCode);
  }
  const fileName = process.argv[ARGV_INDEX_FILE_PATH];

  try {
    // Delete any dump directory on the container
    await execShellCommand(...parseCmdAndArgs('docker exec database rm -rf /dump'));
    // Delete the dump zip file if on container
    await execShellCommand(...parseCmdAndArgs('docker exec database rm -rf /dump.zip'));
    // Copy the dump zip file over to the container
    await execShellCommand(...parseCmdAndArgs(`docker cp ${fileName} database:/dump.zip`));
    // Unzip the dump zip into a directory
    await execShellCommand(...parseCmdAndArgs('docker exec database unzip /dump.zip -d /'));
    // Perform the data dump import of the Strapi database
    await execShellCommand(...parseCmdAndArgs('docker exec database mongorestore --uri ' +
      '"mongodb://root:capstone@database:27017/?authSource=admin" --drop -d strapi /dump/strapi'));

    // Update the roles and permissions
    console.log('Updating roles and permissions');
    await execShellCommand(...parseCmdAndArgs('node update-roles-permissions.js'));

    console.log('\nDatabase import successful!');
    process.exit(s.successCode);
  } catch(e) {
    // Log the error to console
    console.error(e);
    process.exit(s.errCode);
  }
})();
