// (~’.')~ async module loading (~’.')~
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // serves a bundle from memory (not minified + has devServer code too)
    // publicPath : '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // keep the old name + extension instead of the hash
              outputPath: 'img/' //copy here
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      // TODO : push fix to github
      filename: 'css/style.[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackMd5Hash()
  ],
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
  // performance: {
  //   hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  // }
};
