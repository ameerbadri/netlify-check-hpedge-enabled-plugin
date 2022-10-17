// index.js
  // Accessing dns module
  //const dns = require('dns');
  
  const dns = require("dns");

  module.exports = {
    onPreBuild: async ({ inputs }) => {
      console.log(inputs);
      // Set the rrtype for dns.resolve() method
      const rrtype = "CNAME";
      // Calling dns.resolve() method for hostname
      dns.resolve(inputs.siteName, rrtype, function (err, records) {
        console.log('error: %j', err);
        console.log('records: %j', records);
      });
      console.log("Hello world from onPreBuild event in netlify-check-hpedge-enabled: ");
    }
  } 