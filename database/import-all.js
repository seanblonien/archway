/**
 * Script that runs all three import scripts (database, strapi, and
 * uploads) with the corresponding BaseExports files.
 */
/* eslint-disable no-console */
const path = require('path');
const execShellCommand = require('./execShellCommand.js');

// Gets the absolute file path of the local file
const absPath = (file) => path.resolve(__dirname, file);

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  try {
    // Run Strapi import
    console.log('=== Importing Strapi ===');
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
