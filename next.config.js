const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const { withPlugins } = require('next-compose-plugins');
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

const nextConfig = {
  /*
   * Workbox Options
   */
  workboxOpts: {
    clientsClaim: true,
    skipWaiting: true,
    swDest: path.join(__dirname, 'public/service-worker.js'),
  },

  /*
   * Webpack configuration
   */
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // Config for importing svg
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Build objectwith environment variables
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});
    /*
     * Allows you to create global constants which can be configured
     * at compile time, like our environment variables
     */
    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  },
};

module.exports = withPlugins([[withCSS], [withOffline]], nextConfig);
