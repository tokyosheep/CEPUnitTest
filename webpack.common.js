const path = require('path');

module.exports = {
  entry: {
    main: './src/main.ts',
    test1: './unitTest/test1.ts',
    test2: './unitTest/test2.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /.ts/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { loose: true, modules: 'commonjs' }], '@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-object-assign', 'transform-es2017-object-entries']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: false // minification may produce syntax errors because ExtendScript does not support nested ternary operators without parentheses
  },
  target: 'browserslist'
  // devtool: "inline-source-map",
};