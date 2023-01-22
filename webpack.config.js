module.exports = {
    mode: 'development', // or 'production'
    entry: './src/script.js',
    output: {
      path: __dirname + '/dist',
      filename: 'script-About.js'
    },
    plugins: [
      new Dotenv({
        path: './.env', // Path to .env file
        safe: true // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      })
    ]
  };
  
