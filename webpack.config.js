// check out https://stackoverflow.com/questions/48985780/webpack-4-create-vendor-chunk/48986526#48986526
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/App.jsx'],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      'react-router-bootstrap',
      'whatwg-fetch',
      'babel-polyfill'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
          },
        },
      },
    ],
  },
  // see https://github.com/webpack/webpack/issues/3486#issuecomment-267599683
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
