// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  entry: {
    app: './src/index.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'Assets/[hash][ext]'
  },

  devServer: {
    open: true,
    host: 'localhost'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash].css'
    // }),

    new ESLintPlugin({ extensions: ['ts', '.js'] }),

    new CopyPlugin({
      patterns: [
        {
          from: './src/Assets',  // if to: "./blabla" not specified, "to" defaults to "./dist"
          to: 'Assets',
          noErrorOnMissing: true
        }
      ]
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|mp3)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())
  } else {
    config.mode = 'development'
  }
  return config
}
