# Next starter app + Netlify Check HP Edge Enabled Build Plugin

This is a web app demo using a custom build plugin to check if HP Edge is enabled properly. It's using the starter [Next.js](https://nextjs.org/) project. The build plugin runs at part of the Netlify build process and does the following:

1. The build plugin runs as part of the Netlify site build process (enabled by settings in netlify.toml file)
2. The plugin take the sites name (derived from the URL being built) and checks against a DNS server to confirm if the "CNAME" and "A" records are properly setup so that the site is served from the Netlify High Performance Edge network.
 Note: In some instances if there is another CDN configured from which the requests are proxied to Netlify the results may not be accurate.
3. The plugin will log the results in the build logs and the deploy summary.

To get started, click on [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ameerbadri/netlify-check-hpedge-enabled-plugin)

(If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify)