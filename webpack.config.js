const path=require('path')
const HtmlWebpackPlugin=require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');


var config = {
    entry:{
        app:path.join(__dirname,'src/index.js'),
    },
    // optimization: {
    //     minimizer: [
    //       new TerserPlugin({
    //         cache: true,
    //         parallel: true,
    //         sourceMap: true, // Must be set to true if using source-maps in production
    //         terserOptions: {
    //           // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //         }
    //       }),
    //     ],
    // },
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist'),
        // publicPath: '/src/assets'
    },
    devServer: {
        hot:true,
        host:'',
        port:'3000',
        // overlay:true //出错时在页面直接显示错误，可有可无
        proxy: {
          '/api/*': {
            target: 'http://erp.openluat.com/',
            // pathRewrite: {'^/api' : ''},//路径重写
            changeOrigin: true,     // target是域名的话，需要这个参数，
            secure: false,          // 设置支持https协议的代理
          }
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:path.join(__dirname,'node_modules'),
                use:['babel-loader']
            },
            {
                test:/\.css$/,
                use:[
                    { loader: "style-loader" },
                    { loader: "css-loader" } 
                ]
            },
            {
                test:/\.less$/,
                use:[
                    { loader: "style-loader" },// creates style nodes from JS strings
                    { loader: "css-loader" },// translates CSS into CommonJS
                    { loader: "less-loader" }// compiles Less to CSS
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: false,
                        // fallback: 'responsive-loader',
                        // quality: 85,
                        // name:path.join(__dirname,'images/[name].[hash:7].[ext]')
                    },
                  },
                ],
            },
            {
              test: /\.json$/,
              use:['json-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html'),
            hash: true
        }),
    ]
}


module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.mode = 'development';
    config.devtool = 'eval-source-map';
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
  }

  return config;
}