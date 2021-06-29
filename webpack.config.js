const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'static/js/app'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Should be in STATICFILES_DIRS
    publicPath: devMode ? '/static/' : '/public/', // Should match Django STATIC_URL
    filename: '[name].js', // No filename hashing, Django takes care of this
    chunkFilename: '[id]-[chunkhash].js', // Do have Webpack hash chunk filename
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  devServer: {
    writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
  },
  devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
};
