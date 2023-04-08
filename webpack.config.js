const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Чтобы разобраться в этом файлике, прочитайте https://habr.com/ru/articles/701724/

// TODO разобраться, нужно ли нам несколько точек входа (для разделения кода). Читать статьи:
// https://webpack.js.org/concepts/entry-points/
// https://webpack.js.org/configuration/entry-context/

// TODO проверить работу с изображениями svg 47-53 строчки кода (test: svg ...)

// Для опитимизации изображений читать https://habr.com/ru/articles/701724/#оптимизация-изображений

module.exports = {
  entry: path.join(__dirname, 'public'),
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    publicPath: '/', // указываем, что все ресурсы будут расположены в корне сайта
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.handlebars/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[name].[contenthash][ext]'),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['public/dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'public'),
    // contentBase: path.join(__dirname, 'public'), // указываем папку с вашим index.html
    historyApiFallback: true,
    // historyApiFallback: {
    // eslint-disable-next-line max-len
    //   index: '/', // указываем, что при запросе к любому пути, кроме API, нужно отправлять index.html
    // },
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  },
};
