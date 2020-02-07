const { execShellCommand } = require('./execShellCommand');
const path = require("path");

(async () => {
    try {
        // Delete any dump directory on the container
        await execShellCommand(`docker exec database rm -rf /dump`);
        // Delete the dump zip file if on container
        await execShellCommand(`docker exec database rm -rf /dump.zip`);
        // Copy the dump zip file over to the container
        await execShellCommand(`docker cp ${path.resolve(__dirname, `dump.zip`)} database:/dump.zip`);
        // Unzip the dump zip into a directory
        await execShellCommand(`docker exec database unzip /dump.zip -d /`);
        // Perform the data dump import of the Strapi database
        await execShellCommand(`docker exec database mongorestore --uri "mongodb://root:capstone@database:27017/?authSource=admin" --drop -d strapi /dump/strapi`);
        // Log successful execution
        console.log(`Import successful!`);
    } catch(e){
        // Log the error to console
        console.error(e);
    }
})();
