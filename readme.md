npm i yarn -g  npm config get registry npm config set registry 
yarn init -y
yarn add webpack webpack-cli webpack-dev-server -D
创建webpack.config.js 设置mode 设置module.exports entry 设置output
创建index.js import React/ReactDOM 创建index.html
创建App.js 在index.js内引入App.js
yarn add react react-dom
yarn add @babel/core @babel/preset-env @babel/preset-react -D
webpack.config.js配置module:{rules:[{}]}，注意格式 exclude
yarn add babel-loader -D
在src内新建.babelrc文件{"presets":["@babel/preset-env","@babel/preset-react"]}
在webpack.config.js内const HtmlWebpackPlugin=require("html-webpack-plugin")
yarn add html-webpack-plugin -D
在webpack.config.js内plugins:[new..]
yarn run build或者 webpack 在浏览器打开index.html//使用后者必须先npm i webpack webpack-cli -g
在webpack.config.js内devServer:{hot:true,port:'3000'}
yarn run dev或者 webpack-dev-server //使用后者必须先 npm i webpack-dev-server -g
yarn add react-hot-loader -D //不刷新浏览器，实现热更新
.babelrc  "plugins":["react-hot-loader/babel"]
App.jsx import {hot} from "react-hot-loader/root"   export default hot(App)
yarn run dev
可以不刷新浏览器热更新，但是会报一个警告 
yarn add react-dom@npm:@hot-loader/react-dom 再次yarn run dev 

至此,已经能够使用webpack手动配置react项目,能够使用热更新,能够配置css,less,能够使用babel,webpack,npm,yarn

下一阶段,把js(jsx)转为typescript

