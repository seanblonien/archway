const { exec } = require("child_process");
const path = require("path");

// Perform the data dump of the strapi database
exec("docker exec database mongodump -o /dump --quiet --uri \"mongodb://root:capstone@database:27017/strapi?authSource=admin\"");
// Compress the database dump into one zip file
exec("docker exec database zip -rqq /dump.zip /dump");
// Copy the dump zip file over to the local directory
exec(`docker cp database:/dump.zip ${path.resolve(__dirname, `dump.zip`)}`);
