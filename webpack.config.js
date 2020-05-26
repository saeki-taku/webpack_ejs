const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',//development or production
  devtool: 'source-map',
  entry: './src/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/[name]-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 30%, not dead' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,//devlopToolにて確認出来るかの有無
            }
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name]-[hash].[ext].png',
              publicPath: '/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.html$/i,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //     },
      //   ],
      // },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-compiled-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name]-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/ejs/index.ejs',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/ejs/access.ejs',
      filename: 'access.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
