const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};

const devConfig = {
  ...baseConfig,
  devtool: 'eval-source-map',
};

const prodConfig = {
  ...baseConfig,
  devtool: false,
  plugins: [...baseConfig.plugins, new BundleAnalyzer()],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return prodConfig;
  }
  return devConfig;
};
