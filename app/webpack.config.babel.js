import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const client = {
	entry: ['./src/index.js', './src/sass/App.scss'],
	output: {
		path: path.resolve(__dirname, 'static'),
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' }
					],
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/style.css'), 
	    //new webpack.optimize.UglifyJsPlugin(),
	]
}

const server = {
	target: 'node',
	externals: [nodeExternals()],
	entry: './server.js',
	output: {
		path: __dirname,
		filename: 'server-bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "css-loader" },
				]
			}

		]
	},
	plugins: [
	    //new webpack.optimize.UglifyJsPlugin(),
	]
}

export default [client, server];