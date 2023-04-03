const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    proxy: [
      //Proxy all request, except for GET request to '/login' || '/firstpath' || 'signup'
      {
        context: ['/**'],
        target: 'http://localhost:3000',
        bypass: (req) => {
          return (req.url === '/login' ||
            req.url === '/makersquare' ||
            req.url === '/signup') &&
            req.method === 'GET'
            ? '/index.html'
            : undefined;
        },
      },
    ],

    hot: true,
    port: 8080,
  },
};
