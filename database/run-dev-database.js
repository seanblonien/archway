/**
 * Starts an instance of a MongoDB dev-database to be used for development purposes.
 */
const { execShellCommand } = require('./execShellCommand');

// Runs the database:latest Docker image for the dev environment with its own volume mount, port, and environment variables
// -d is for detached mode
// --name specifies container name
// --rm means container is removed after it terminates
// -e sets environment variables
// -v mounts and creates a volume so that the database is persistent
// -p maps <host port>:<container port>
// database:latest is the image to use for the container
execShellCommand(`docker run -d --name=dev-database --rm -e HOSTNAME=dev-database -v /mnt/mongodb/mongodata-dev:/data/db -p=27020:27017 database:latest`);
