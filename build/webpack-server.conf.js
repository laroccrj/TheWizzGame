const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  output: {
    filename: 'server-compiled.js'
  },
  target: 'node',
  entry: {
    index: './src/server/index.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(pdf|jpg|png|svg|ico)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [new NodemonPlugin()]
}
