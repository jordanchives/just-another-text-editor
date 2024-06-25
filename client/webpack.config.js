const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // Add the HtmlWebpackPlugin, WebpackPwaManifest, and InjectManifest plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        short_name: 'Text Editor',
        description: 'Take notes and save them in the browser. Includes JavaScript syntax highlighting.',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    // Add the module.rules array to the module object
    module: {
      rules: [
        {
          // Add the css-loader and style-loader to the module.rules array
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Add the babel-loader to the module.rules array
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
            },
          },
        },
      ],
    },
  };
};
