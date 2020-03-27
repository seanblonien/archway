/**
 * Function for handling shell/command-line commands (i.e. Docker commands) for Node scripts.
 */
/* eslint-disable no-console */
const path = require('path');
const {spawn} = require('child_process');

const onExit = (childProcess) => new Promise((resolve, reject) => {
  childProcess.on('exit', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Exit with error code: ${code}`));
    }
  });
  childProcess.on('error', (err) => {
    reject(err);
  });
});

// Executes a shell command and logs stdout to console if successful.
// On error, and error will be thrown with the stderr output.
const execShellCommand = (cmd, args, cwd = path.resolve(__dirname)) => {
  console.log(`Executing command '${cmd} ${args.join(' ')}'`);
  const child = spawn(cmd, args, {cwd, stdio: [process.stdin, process.stdout, process.stderr]});
  return onExit(child);
};

// Parses a shell command into its command argument and its arguments
// Returns [command, [...args]]
const parseCmdAndArgs = (cmd) => {
  const arr = cmd.split(' ');
  return [arr[0], arr.slice(1)];
};

module.exports = {
  execShellCommand,
  parseCmdAndArgs
};
