const path = require('path');
const webpack = require('webpack');
const nodeExternals = require( 'webpack-node-externals');

const locales = ['en', 'sv'];

const config = {
  // https://github.com/angular/angular-cli/issues/10787#issuecomment-388498788
  mode: 'none',
  entry: {  server: './server/main.ts' },
  resolve: {
    alias: {
    },
    extensions: ['.js', '.ts'],
    mainFields: ['main', 'module']
  },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [
    nodeExternals({
      whitelist: /^(?!(@nestjs\/(common|core|microservices)|livereload|concurrently)).*/
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true }
      }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /((.+)?angular(\\|\/)core(.+)?|express(.+)?|(.+)?nestjs(\\|\/)(.+)?)?/,
      path.join(__dirname, 'src'), // location of your src
      {}
    ),
    // workaround for https://github.com/angular/angular-cli/issues/9975
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)common(\\|\/)locales/,
      /(en-AU|en-CA|en-GB|en-IE|en-NZ|en|sv|lv|da)$/
    )
  ]
};

config.resolve.alias = locales.reduce((aliases, locale) => {
  const localeAlias = `main.server.${locale.toLowerCase()}`;
  const localeDirectory = path.join(__dirname, 'dist', 'server', locale.toLowerCase(), 'main.js');
  return {...aliases, [localeAlias]: localeDirectory}
}, config.resolve.alias);

module.exports = config;
