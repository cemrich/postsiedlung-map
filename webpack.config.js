const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
	devServer: {
		contentBase: './dist'
	},

	resolve: {
    alias: {
      leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/img/markers', to: 'img/markers' },
			{ from: 'src/img/locations', to: 'img/locations' }
		]),
  ],
  module: {
    rules: [
      {
				test:/\.css$/,
				use:['style-loader','css-loader']
      },
			{
				test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'img'
					}
        }]
			}
    ]
  }
};
