const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  externals: { 'async_hooks': 'async_hooks' },

  entry: "./src/app.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    open: {
      app: {
        name: "Google Chrome",
      },
    },
    port: 3000,
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      url: require.resolve("url/"),
      fs: false, // Зависит от вашего использования, но "fs" обычно не доступна в браузере
      net: false, // Аналогично "fs", "net" обычно не доступен в браузере
      util: require.resolve("util/"),
    },
  },
};
