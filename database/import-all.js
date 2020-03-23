/**
 * Script that runs all three import scripts (database, Strapi, and
 * uploads) with the corresponding BaseExports files.
 */
/* eslint-disable no-console */
const {execShellCommand} = require('./execShellCommand');
const {absPath} = require('./execShellCommand');

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  console.log('stdout and stderr are delayed until the process has finished.');
  try {
    // Run Strapi import
    console.log('=== Importing Strapi ===\n(May take a while)');
    await execShellCommand(`node ${absPath('import-strapi.js')} ${absPath('BaseStrapiExport.json')}`);
    // Run database import
    console.log('=== Importing Database ===');
    await execShellCommand(`node ${absPath('import-database.js')} ${absPath('BaseDatabaseExport.zip')}`);
    // Run uploads import
    console.log('=== Importing Uploads ===');
    await execShellCommand(`node ${absPath('import-uploads.js')} ${absPath('BaseUploadsExport.zip')}`);

    console.log('All imports successful!');
  }catch (e) {
    console.error(`Error: ${e}`);
  }
})();
