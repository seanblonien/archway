/**
 * Script that exports the Strapi uploads from the running Strapi container.
 *
 * Stores the uploads in the local directory as a zip file that can be
 * later used for importing to another Strapi instance.
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
    console.error('Please provide a filename for the uploads export.');
    process.exit(s.errCode);
  }
  const fileName = process.argv[ARGV_INDEX_FILE_PATH];

  try {
    // Delete existing uploads.zip
    await execShellCommand(...parseCmdAndArgs('docker exec strapi rm -rf /uploads.zip'));
    // Zip the uploads directory
    await execShellCommand(...parseCmdAndArgs('docker exec strapi zip -r /uploads.zip /srv/app/public/uploads'));
    // Copy the uploads zip to the local directory with the given filename
    await execShellCommand(...parseCmdAndArgs(`docker cp strapi:/uploads.zip ${fileName}`));

    console.log('\nUploads export successful!');
    process.exit(s.successCode);
  } catch(e) {
    // Log the error to console
    console.error(e);
    process.exit(s.errCode);
  }
})();
