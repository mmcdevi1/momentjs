const { resolve } = require('path')

module.exports = {
	entry: ['babel-polyfill', './src/index'],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	mode: 'development',
	context: __dirname,
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
      {
        test: /js?$/,
        include: resolve(__dirname, './src'),
        loader: 'babel-loader'
      }
    ]
  }
}