/**
 * Script that imports the Strapi uploads from a locally stored zip file
 * (generated from the export-uploads.js) into the locally running Strapi Docker
 * container.
 *
 * Note: any pre-existing uploads on Strapi will be deleted and overridden.
 */
/* eslint-disable no-console */
const {execShellCommand, parseCmdAndArgs}  = require('./execShellCommand');
const s = require('./strapi-scripts');

const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  // Verify a filename was provided
  if(process.argv.length < ARGV_REQUIRED_LENGTH) {
    console.error('Please provide a filename for the uploads import.');
    process.exit(s.errCode);
  }
  const filename = process.argv[ARGV_INDEX_FILE_PATH];

  try {
    // Delete existing uploads directory
    await execShellCommand(...parseCmdAndArgs('docker exec strapi rm -rf /srv/app/public/uploads'));
    // Delete existing uploads.zip
    await execShellCommand(...parseCmdAndArgs('docker exec strapi rm -rf /uploads.zip'));
    // Copy the local uploads zip to the Strapi container
    await execShellCommand(...parseCmdAndArgs(`docker cp ${filename} strapi:/uploads.zip`));
    // Unzip the uploads
    await execShellCommand(...parseCmdAndArgs('docker exec strapi unzip /uploads.zip -d /'));

    console.log('\nUploads import successful!');
    process.exit(s.successCode);
  } catch(e) {
    // Log the error to console
    console.error(e);
    process.exit(s.errCode);
  }
})();
