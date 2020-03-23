/**
 * Script that runs all three export scripts (database, Strapi, and
 * uploads) and outputs them to their corresponding BaseExports files.
 */
/* eslint-disable no-console */
const {execShellCommand} = require('./execShellCommand');
const {absPath} = require('./execShellCommand');

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  console.log('stdout and stderr are delayed until the process has finished.');
  try {
    // Run Strapi export
    console.log('=== Exporting Strapi ===');
    await execShellCommand(`node ${absPath('export-strapi.js')} ${absPath('BaseStrapiExport.json')}`);
    // Run database export
    console.log('=== Exporting Database ===');
    await execShellCommand(`node ${absPath('export-database.js')} ${absPath('BaseDatabaseExport.zip')}`);
    // Run uploads export
    console.log('=== Exporting Uploads ===');
    await execShellCommand(`node ${absPath('export-uploads.js')} ${absPath('BaseUploadsExport.zip')}`);

    console.log('All exports successful!');
  }catch (e) {
    console.error(`Error: ${e}`);
  }
})();
