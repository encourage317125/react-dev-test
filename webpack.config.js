const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { // index entry file
    client: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"), // the bundle output path
    filename: "[name].bundle.js", // the name of the bundle
  },
  devServer: {
    port: 30080, // you can change the port
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts and .tsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'), // index html file
    }),
  ],
}