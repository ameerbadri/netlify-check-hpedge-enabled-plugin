// index.js
const { spawn } = require("child_process");
  module.exports = {
    onPreBuild: () => {
      console.log("Hello world from onPreBuild event in netlify-check-hpedge-enabled");
      const ls = spawn("host", ["www.netlifyhpedge.com"]);

      ls.stdout.on("data", data => {
          console.log(`stdout: ${data}`);
      });

      ls.stderr.on("data", data => {
          console.log(`stderr: ${data}`);
      });

      ls.on('error', (error) => {
          console.log(`error: ${error.message}`);
      });

      ls.on("close", code => {
          console.log(`child process exited with code ${code}`);
      });
          },
  }