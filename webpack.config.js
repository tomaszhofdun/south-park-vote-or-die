var path = require("path");

module.exports = {
  entry: {
    App: "./app/assets/scripts/App.js"
    
  },
  output: {
    path: path.resolve(__dirname, "app/temp/scripts"),
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
