const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, 'src', 'main.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.ts']
  }
}
