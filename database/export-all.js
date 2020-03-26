/**
 * Script that runs all three export scripts (database, Strapi, and
 * uploads) and outputs them to their corresponding BaseExports files.
 */
/* eslint-disable no-console */
const {execShellCommand, parseCmdAndArgs} = require('./execShellCommand');
const s = require('./strapi-scripts');

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  console.log('stdout and stderr are delayed until the process has finished.');
  try {
    // Run Strapi export
    console.log('=== Exporting Strapi ===');
    await execShellCommand(...parseCmdAndArgs('node export-strapi.js BaseStrapiExport.json'));
    // Run database export
    console.log('=== Exporting Database ===');
    await execShellCommand(...parseCmdAndArgs('node export-database.js BaseDatabaseExport.zip'));
    // Run uploads export
    console.log('=== Exporting Uploads ===');
    await execShellCommand(...parseCmdAndArgs('node export-uploads.js BaseUploadsExport.zip'));

    console.log('All exports successful!');
    process.exit(s.successCode);
  }catch (e) {
    console.error(`Error: ${e}`);
    process.exit(s.errCode);
  }
})();
