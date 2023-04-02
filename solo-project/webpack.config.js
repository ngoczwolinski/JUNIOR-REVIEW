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
      //For login, logout, and signup, proxy all request, except for GET request
      {
        context: ['/login', '/logout', '/signup', '/'],
        target: 'http://localhost:3000',
        bypass: (req) => {
          return req.method === 'GET' ? '/index.html' : undefined;
        },
      },
      {
        '**': 'http://localhost:3000',
      },
    ],

    hot: true,
    port: 8080,
  },
};  
