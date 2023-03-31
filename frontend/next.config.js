/** @type {import('next').NextConfig} */
const withSass = require("@zeit/next-sass");
const path = require("path");

module.exports = withSass({
  cssModules: true,
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
