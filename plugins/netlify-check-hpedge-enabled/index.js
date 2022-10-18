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
  onPreBuild: async ({utils}) => {
    const url = process.env.URL;
    console.log("URL of the Site: " + url);
    const site_name = url.replace("https://", "")

    try {
      //Get bare and WWW domains from inputs
      const bareDomain = site_name.includes("www")
        ? site_name.replace("www.", "")
        : `${site_name}`;

      const wwwDomain = site_name.includes("www")
        ? site_name
        : `www.${site_name}`;

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
          console.log("Site is on Netlify High Performance Edge");
          utils.status.show({
            title: "HP Edge Setup Status",
            summary: "Success: Site is on Netlify High Performance Edge",
            // Optional. Empty by default.
            text: "You're all set!",
          });          
          return;
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("WARNING: Site not on HP Edge - Check your DNS configuration");
      utils.status.show({
        title: "HP Edge Setup Status",
        summary: "WARNING: Site not on HP Edge - Check your DNS configuration",
        text: "Please contact Netlify support or your account manager to help with HP Edge setup or upgrade.",
      });

    }
  },
};