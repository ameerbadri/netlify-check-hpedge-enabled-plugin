// index.js
// const { spawn } = require("child_process");

const { exec } = require("child_process");
  module.exports = {
    onPreBuild: () => {
      console.log("Hello world from onPreBuild event in netlify-check-hpedge-enabled");
      const ls = spawn("dig", ["www.netlifyhpedge.com"]);

      // ls.stdout.on("data", data => {
      //     console.log(`stdout: ${data}`);
      // });

      // ls.stderr.on("data", data => {
      //     console.log(`stderr: ${data}`);
      // });

      // ls.on('error', (error) => {
      //     console.log(`error: ${error.message}`);
      // });

      // ls.on("close", code => {
      //     console.log(`child process exited with code ${code}`);
      // });

      exec("host www.netlifyhpedge.com", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout/Netlify check hpedge Enabled: ${stdout}`);
      });

          },
  }