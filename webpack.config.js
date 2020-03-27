const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ThreeExamples = require('import-three-examples');

module.exports = {
	entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    },
	plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ],
	mode: "development",
    module: {
        rules: [ //配置加载器
            {
				test: /\.m?js$/,
                //排除一些文件
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react']
                    }
                }
            },
			{
                test: /\.css$/,
                use:[
					    {
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('autoprefixer'),
									require('precss'),
									require('postcss-flexbugs-fixes')
								]
							}
						},
						{
						    loader: 'sass-loader',
						}
				    ]
            },
			{
				test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.jpg$/, /\.hdr$/, /\.jfif$/],
				loader: 'url-loader',
				options: {
					limit: 10000, //1w字节以下大小的图片会自动转成base64
				},
			},
			{
				test: require.resolve('three/examples/js/loaders/OBJLoader'),
				use:'imports-loader?THREE = three',
			},
			{
				test: require.resolve('three/examples/js/loaders/OBJLoader'),
				use:'exports-loader?THREE.OBJLoader',
			},
            {
                test: require.resolve('three/examples/js/loaders/TDSLoader.js'),
                use:'imports-loader?THREE = three',
            },
            {
                test: require.resolve('three/examples/js/loaders/TDSLoader.js'),
                use:'exports-loader?THREE.OBJLoader',
            },

			...ThreeExamples
        ]
    },
}
