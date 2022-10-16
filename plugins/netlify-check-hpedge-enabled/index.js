// index.js
  // Accessing dns module
  const dns = require('dns');

  module.exports = {
    onPreBuild: () => {
      console.log("Hello world from onPreBuild event in netlify-check-hpedge-enabled");
    
      // Set the rrtype for dns.resolve() method
      const rrtype="CNAME";
      // Calling dns.resolve() method for hostname
      dns.resolve('www.netlifyhpedge.com', rrtype, (err, records) => console.log('records: %j', records)); 
          },
  }