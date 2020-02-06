const { exec } = require("child_process");

// Runs the database:latest image for the dev environment with its own volume mount, port, and environment variables
// -d is for detatched mode
// --rm means container is removed after it terminates
exec(`docker run -d --name=dev-database --rm -e HOSTNAME=dev-database -v /mnt/mongodb/mongodata-dev:/data/db -p=27020:27017 database:latest`);
