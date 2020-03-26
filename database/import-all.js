/**
 * Script that runs all three import scripts (database, Strapi, and
 * uploads) with the corresponding BaseExports files.
 */
/* eslint-disable no-console */
const {execShellCommand, parseCmdAndArgs} = require('./execShellCommand');
const s = require('./strapi-scripts');

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  console.log('stdout and stderr are delayed until the process has finished.');
  try {
    // Run Strapi import
    console.log('=== Importing Strapi ===\n(May take a while)');
    await execShellCommand(...parseCmdAndArgs('node import-strapi.js BaseStrapiExport.json'));
    // Run database import
    console.log('=== Importing Database ===');
    await execShellCommand(...parseCmdAndArgs('node import-database.js BaseDatabaseExport.zip'));
    // Run uploads import
    console.log('=== Importing Uploads ===');
    await execShellCommand(...parseCmdAndArgs('node import-uploads.js BaseUploadsExport.zip'));

    console.log('All imports successful!');
    process.exit(s.successCode);
  }catch (e) {
    console.error(e);
    process.exit(s.errCode);
  }
})();
