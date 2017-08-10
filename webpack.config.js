let path=require('path');
let HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    //打包的入口文件
    entry:'./notes-React/index.js',
    //配置输出的目录和文件名
    output:{
        //打包后的文件保存的目录
        path:path.resolve('build/'),
        //保存打包后的文件名
        filename:'bundle.js'
    },
    //配置模块的打包方式
    module:{
        //配置规则 配置不同类型文件的加载方式
        rules:[
            {
                test:/\.jsx?$/,//如果加载的模块后缀是js或jsx的话
                use:'babel-loader',//使用babel进行转译
                exclude:/node_modules/ //为了提高解析速度，需要忽略node_modules下的东西
            },
            {
                test:/\.less$/,//处理less文件
                use:['style-loader','css-loader','less-loader']//使用三个加载器编译并加载less文件
            },
            {
                test:/\.css$/,//处理less文件
                use:['style-loader','css-loader']//使用2个加载器编译并加载css文件
            },
            {
                test:/\.(gif|png|jpg|jpeg|svg|ttf|woff2|woff|eot)$/,//如果是图片等资源的话，用url-loader来加载
                //限定图片大小的分界线，如果图片的体积小于给定的值的话，此图片会变成base64格式内嵌到网页中，否则的话会经过重命名后保存到目标路径中，在网页中会得到一个新的URL路径
                use:"url-loader?limit=8192"
            }
        ]
    },
    devtool:'source-map',
    //配置插件
    plugins:[
        //可以以index.html作为模版，并向其中插入打包后的bundle.js文件，然后保存到目标路径下
        new HtmlWebpackPlugin({
            //以app下的html作为模版
            template:'./notes-React/index.html'
        })
    ]
}