const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config({
  path: `${__dirname}/../env/prod.env`
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const plugins = [new webpack.DefinePlugin(envKeys)];

module.exports = require('./webpack.base')({
  mode: 'production',
  devServer: {
    port: 3000,
    contentBase: path.join(process.cwd(), 'dist/')
  },
  plugins
});
