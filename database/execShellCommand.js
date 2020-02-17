/**
 * Function for handling shell/command-line commands (i.e. Docker commands) for Node scripts.
 */
const { exec } = require("child_process");

// Executes a shell command and logs stdout to console if successful.
// On error, and error will be thrown with the stderr output.
const execShellCommand = cmd => {
    console.log(`Executing command '${cmd}'`);
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                throw new Error(stderr);
            }
            if(stdout) console.log(stdout);
            resolve();
        });
    });
};

module.exports = execShellCommand;
