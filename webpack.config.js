const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file
      safe: true // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    })
  ]
};
