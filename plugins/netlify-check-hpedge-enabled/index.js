// index.js
const { spawn } = require("child_process");
  module.exports = {
    onPreBuild: () => {
      console.log("Hello world from onPreBuild event in netlify-check-hpedge-enabled");
    },
  }