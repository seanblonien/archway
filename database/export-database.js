const { execShellCommand }  = require('./execShellCommand');
const path = require("path");

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
