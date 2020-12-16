var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'admin/js') + '/code-snippet-admin-app.js',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'code-snippet-admin-app-bundle.js',
    path: path.resolve(__dirname, 'admin/dist/js'),
  },
};
