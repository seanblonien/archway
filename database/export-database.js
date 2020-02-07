/**
 * Script that export the Strapi database from the database Docker container that is running.
 *
 * Stores the database dump in the local directory as a zip file that can be later used for importing to another
 * database instance.
 */
const { execShellCommand }  = require('./execShellCommand');
const path = require("path");

// Anonymous method that is directly called to allow for async/await usage
(async () => {
    try {
        // Delete any dump directory on the container
        await execShellCommand(`docker exec database rm -rf /dump`);
        // Delete the dump zip file if on container
        await execShellCommand(`docker exec database rm -f /dump.zip`);
        // Perform the data dump of the Strapi database
        await execShellCommand(`docker exec database mongodump -o /dump --quiet --uri "mongodb://root:capstone@database:27017/strapi?authSource=admin"`);
        // Compress the database dump into one zip file
        await execShellCommand(`docker exec database zip -r /dump.zip /dump`);
        // Copy the dump zip file over to the local directory
        await execShellCommand(`docker cp database:/dump.zip ${path.resolve(__dirname, `dump.zip`)}`);
        // Log successful execution
        console.log(`Export successful!`);
    } catch(e){
        // Log the error to console
        console.error(e);
    }
})();
