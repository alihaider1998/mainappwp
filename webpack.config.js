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
//       publicPath: "auto",
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
//       ],
//     },
//     plugins: [
//       new ModuleFederationPlugin({
//         name: "mainApp",
//         filename: "remoteEntry.js",
//         remotes: {
//           app1: "app1@http://localhost:3001/remoteEntry.js",
//         },
//         exposes: {
//           "./NotFound": "./src/components/NotFound",
//           "./styles": "./src/index.css",
//         },
//         shared: {
//           react: {
//             singleton: true,
//             requiredVersion: false,
//             eager: false,
//           },
//           "react-dom": {
//             singleton: true,
//             requiredVersion: false,
//             eager: false,
//           },
//           "react-router-dom": {
//             singleton: true,
//             requiredVersion: false,
//             eager: false,
//           },
//         },
//       }),
//       new HtmlWebpackPlugin({
//         template: "./public/index.html",
//       }),
//     ],
//     optimization: {
//       moduleIds: "named",
//       chunkIds: "named",
//     },
//     devServer: {
//       port: PORT,
//       historyApiFallback: true,
//       open: true,
//       hot: true,
//       headers: {
//         "Access-Control-Allow-Origin": "*", // Add CORS header
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
//   };
// };
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const PORT = 3000;

  // Repository name for GitHub Pages
  const repoName = "mainappwp";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction
        ? `/${repoName}/` // GitHub Pages path
        : "auto",
      clean: true, // Clean the output directory before emit
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
        // Add asset handling for images, fonts, etc.
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "mainApp",
        filename: "remoteEntry.js",
        remotes: {
          // Update remote URLs based on environment
          app1: isProduction
            ? `app1@https://your-production-domain/remoteEntry.js` // Replace with your production URL
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
            eager: isProduction, // Load React eagerly in production
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            eager: isProduction,
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: false,
            eager: isProduction,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        // Add base tag for GitHub Pages
        templateParameters: {
          BASE_URL: isProduction ? `/${repoName}/` : "/",
        },
      }),
    ],
    optimization: {
      moduleIds: "deterministic", // Better for production caching
      chunkIds: isProduction ? "deterministic" : "named",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      port: PORT,
      historyApiFallback: true,
      open: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
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
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
