const { domain } = require("node:process");

// Accessing dns module
const { Resolver } = require("node:dns").promises;

const checkDns = async (domain, rrtype) => {
  resolver = new Resolver();
  try {
    const result = await resolver.resolve(domain, rrtype);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  onPostBuild: async ({ inputs, utils }) => {
    try {
      const bareDomain = inputs.site_name.includes("www")
        ? inputs.site_name.replace("www", "")
        : `${inputs.site_name}`;

      const wwwDomain = inputs.site_name.includes("www")
        ? inputs.site_name
        : `www.${inputs.site_name}`;

      const cnameRecords = await checkDns(wwwDomain, "CNAME");
      const aRecords = await checkDns(bareDomain, "A");

      if (cnameRecords.length > 0 && aRecords.length > 0) {
        const cnameCorrect = await cnameRecords.reduce((result, record) => {
          return record.includes(".netlifyglobalcdn.com")
            ? (result = true)
            : result;
        }, false);

        const aCorrect = await aRecords.reduce((result, record) => {
          return record.includes("147.75.40.150") ? (result = true) : result;
        }, false);

        if (cnameCorrect && aCorrect) {
          console.log("Site is on Netlifys High Performance Edge");
          return;
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      utils.build.failBuild(
        "Build Failed - Site not on HP Edge - Check your DNS configuration"
      );
    }
  },
};
