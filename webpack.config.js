const path=require('path')
const HtmlWebpackPlugin=require("html-webpack-plugin")
module.exports={
    mode:'development',
    entry:{
        app:path.join(__dirname,'src/index.js')
    },
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist'),
        // publicPath: '/src/assets'
    },
    devServer:{
        hot:true,
        host:'',
        port:'3000',
        proxy: {
            '/api/*': {
              target: 'http://erp.openluat.com/',
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,          // 设置支持https协议的代理
            }
          }
        // overlay:true //出错时在页面直接显示错误，可有可无
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

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html')
        })
    ]
}