const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (env, argv) => {
  const CopyWebpackPlugin = require("copy-webpack-plugin");

  const isProduction = argv.mode === "production";
  const PORT = 3000;

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? "/mainappwp/" : "http://localhost:3000/",

      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "mainApp",
        filename: "remoteEntry.js",
        remotes: {
          app1: isProduction
            ? "app1@https://alihaider1998.github.io/app1Wp/remoteEntry.js"
            : "app1@http://localhost:3001/remoteEntry.js",
        },
        exposes: {
          "./NotFound": "./src/components/NotFound",
          "./styles": "./src/index.css",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public/404.html", to: "404.html" }],
      }),
    ],
    optimization: {
      moduleIds: "named",
      chunkIds: "named",
    },
    devServer: {
      port: PORT,
      historyApiFallback: true,
      open: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*", // Add CORS header
      },
      client: {
        logging: "warn",
        overlay: true,
      },
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        console.log(
          "\x1b[36m%s\x1b[0m",
          `Development server is running on port: ${PORT}`
        );
      },
    },
    stats: {
      preset: "minimal",
      moduleTrace: false,
      errorDetails: true,
      chunks: false,
      colors: true,
      assets: false,
      modules: false,
      version: false,
      hash: false,
      builtAt: false,
    },
    infrastructureLogging: {
      level: "error",
    },
  };
};
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// module.exports = (env, argv) => {
//   const isProduction = argv.mode === "production";
//   const PORT = 3000;

//   return {
//     mode: isProduction ? "production" : "development",
//     entry: "./src/index.js",
//     output: {
//       filename: "[name].[contenthash].js",
//       path: path.resolve(__dirname, "dist"),
//       publicPath: isProduction
//         ? "https://alihaider1998.github.io/mainappwp/"
//         : "http://localhost:3000/", // Set explicit path instead of "auto"
//       clean: true,
//     },
//     resolve: {
//       extensions: [".js", ".jsx"],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: "babel-loader",
//         },
//         {
//           test: /\.s[ac]ss$/i,
//           use: ["style-loader", "css-loader", "sass-loader"],
//         },
//         {
//           test: /\.css$/,
//           use: ["style-loader", "css-loader", "postcss-loader"],
//         },
//         {
//           test: /\.(png|svg|jpg|jpeg|gif)$/i,
//           type: "asset/resource",
//         },
//         {
//           test: /\.(woff|woff2|eot|ttf|otf)$/i,
//           type: "asset/resource",
//         },
//       ],
//     },
//     plugins: [
//       new ModuleFederationPlugin({
//         name: "mainApp",
//         filename: "remoteEntry.js",
//         remotes: {
//           app1Wp: isProduction
//             ? "app1Wp@https://alihaider1998.github.io/app1Wp/remoteEntry.js"
//             : "app1Wp@http://localhost:3001/remoteEntry.js",
//         },
//         exposes: {
//           "./NotFound": "./src/components/NotFound",
//           "./styles": "./src/index.css",
//         },
//         shared: {
//           react: {
//             singleton: true,
//             requiredVersion: false,
//             eager: isProduction,
//           },
//           "react-dom": {
//             singleton: true,
//             requiredVersion: false,
//             eager: isProduction,
//           },
//           "react-router-dom": {
//             singleton: true,
//             requiredVersion: false,
//             eager: isProduction,
//           },
//         },
//       }),
//       new HtmlWebpackPlugin({
//         template: "./public/index.html",
//         templateParameters: {
//           BASE_URL: isProduction ? "/mainappwp/" : "/",
//         },
//       }),
//     ],
//     optimization: {
//       moduleIds: "deterministic",
//       chunkIds: isProduction ? "deterministic" : "named",
//       splitChunks: {
//         chunks: "all",
//         cacheGroups: {
//           vendors: {
//             test: /[\\/]node_modules[\\/]/,
//             name: "vendors",
//             chunks: "all",
//           },
//         },
//       },
//     },
//     devServer: {
//       port: PORT,
//       historyApiFallback: true,
//       open: true,
//       hot: true,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//       client: {
//         logging: "warn",
//         overlay: true,
//       },
//       onListening: function (devServer) {
//         if (!devServer) {
//           throw new Error("webpack-dev-server is not defined");
//         }
//         console.log(
//           "\x1b[36m%s\x1b[0m",
//           `Development server is running on port: ${PORT}`
//         );
//       },
//     },
//     stats: {
//       preset: "minimal",
//       moduleTrace: false,
//       errorDetails: true,
//       chunks: false,
//       colors: true,
//       assets: false,
//       modules: false,
//       version: false,
//       hash: false,
//       builtAt: false,
//     },
//     infrastructureLogging: {
//       level: "error",
//     },
//     performance: {
//       hints: isProduction ? "warning" : false,
//       maxEntrypointSize: 512000,
//       maxAssetSize: 512000,
//     },
//   };
// };
