const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'
const rules = [{
		test: /\.(css|scss|sass)$/,
		use: [
			devMode ? 'style-loader' : {
				loader: MiniCssExtractPlugin.loader,
				options: {
					// you can specify a publicPath here
					// by default it use publicPath in webpackOptions.output
					publicPath: '../'
				}
			},
			'css-loader',
			'postcss-loader',
			'sass-loader',
		]
	},
	{
		test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                // babel-loader的一些配置选项
                options: {
                    presets: [
                        '@babel/preset-env'   // 将es6转换为 es5
                    ],
                    plugins: [

                    ]
                }
            }
        ]
	}, {
		test: /\.(png|jpg|gif)$/,
		use: [{
			// 需要下载file-loader和url-loader
			loader: "url-loader",
			options: {
				limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
				// 图片文件输出的文件夹
				outputPath: "images"
			}
		}]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 50000,
			// Output below the fonts directory
            outputPath: "fonts",
		}
	},
	{
		test: /\.html$/,
		// html中的img标签
        loader: 'html-withimg-loader'
	}
];
module.exports = rules;