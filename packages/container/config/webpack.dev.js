const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'https://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@https://localhost:8081/remoteEntry.js',
        auth: 'auth@https://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@https://localhost:8083/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
