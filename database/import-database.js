const { exec } = require("child_process");
const path = require("path");

// Delete any dump directory on the container
exec(`docker exec database rm -r /dump`);
// Delete the dump zip file if on container
exec(`docker exec database rm /dump.zip`);
// Copy the dump zip file over to the container
exec(`docker cp ${path.resolve(__dirname, `dump.zip`)} database:/dump.zip`);
// Unzip the dump zip into a directory
exec(`docker exec database unzip /dump.zip -d /`);
// Perform the data dump import of the strapi database
exec(`docker exec database mongorestore --uri "mongodb://root:capstone@database:27017/?authSource=admin" --drop -d strapi /dump/strapi`);
