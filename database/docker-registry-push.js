/**
 * This script pushes the three most recent builds of the docker images to the remote Gitlab
 * container registry. It uses the users Gitlab username and password to authenticate, and
 * a tag version number is required to version the images.
 */
/* eslint-disable no-console */
const {program} = require('commander');
const {execShellCommand, parseCmdAndArgs} = require('./execShellCommand');
const s = require('./strapi-scripts');

const GITLAB_ENDPOINT = 'gitlab.ecs.baylor.edu:5555/aars/20200143c9-pariveda03';
const IMAGE_NAMES = ['database', 'strapi', 'app'];

program
  .version('1.0.0', '-v, --version')
  .requiredOption('-u, --username <username>', 'Your Gitlab username')
  .requiredOption('-p, --password <password>', 'Your Gitlab password')
  .requiredOption('-t, --tag-version <tagVersion>', 'Tag version number to use for the docker images');

program.parse(process.argv);

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  try {
    // Login to the remote docker container registry
    await execShellCommand(...parseCmdAndArgs(`docker login -u ${program.username} -p ${program.password} ${GITLAB_ENDPOINT}`));

    // Build the docker tag commands
    const tagCommands = IMAGE_NAMES.map(image => {
      const imageAndTag = `${image}:${program.tagVersion}`;
      const imageAndLatest = `${image}:latest`;
      return execShellCommand(...parseCmdAndArgs(`docker tag ${imageAndLatest} ${GITLAB_ENDPOINT}/${imageAndTag}`));
    });
    // Execute the docker tag commands
    await Promise.all(tagCommands);

    // Build the docker push commands
    const pushCommands = IMAGE_NAMES.map(image => {
      const imageAndTag = `${image}:${program.tagVersion}`;
      return execShellCommand(...parseCmdAndArgs(`docker push ${GITLAB_ENDPOINT}/${imageAndTag}`));
    });
    // Execute the docker push commands
    await Promise.all(pushCommands);

    console.log('\nDocker images pushed successfully to remote registry!');
    process.exit(s.successCode);
  } catch(e) {
    // Log the error to console
    console.error(e);
    process.exit(s.errCode);
  }
})();
