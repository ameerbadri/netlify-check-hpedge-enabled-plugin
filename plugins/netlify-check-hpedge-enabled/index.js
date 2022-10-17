// index.js
  // Accessing dns module
  var dns = require('node:dns');

  module.exports = {
    onPreBuild: async ({ inputs }) => {
      console.log(inputs);
      // Set the rrtype for dns.resolve() method
      const rrtype = "CNAME";
      // Calling dns.resolve() method for hostname
      dns.resolve(inputs.site_name, rrtype, (err, addresses) => {
        console.log('error: %j', err);
        console.log('addresses: %j', addresses);
        console.log("Hello from onPreBuild event in netlify-check-hpedge-enabled: " + inputs.site_name);
      });

    }
  } 