//引入express模块
let express=require('express');
let bodyParser=require('body-parser');
let path=require('path');
//引入session中间件
let session=require('express-session');
//消息提示的中间件 特点：一闪而过,一点读取之后立刻全部销毁
let flash=require('connect-flash');
//使用mongodb存储会话的中间件，返回一个函数，需要执行，并传入session作为参数
let MongoStore=require('connect-mongo')(session);
//跨域
//导入proxy
let proxy = require('http-proxy-middleware');

//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
const context = [`/notes/*`];

//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
const options = {
    target: 'http://localhost:9090',
    changeOrigin: true
};

//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options);

//执行express方法得到app
let app=express();
//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
app.use(context, apiProxy);


//把urlencoded格式的字符串转成json对象 req.body=请求体对象
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve('../../node_modules')));
app.use(express.static(path.resolve('./public')));

//使用了此中间件之后，会在请求对象上多req.session属性
app.use(session({
    resave:true,//每次重新保存session
    saveUninitialized:true,//保存未初始化的session
    secret:'password',//加密cookie的秘钥
    //指定会话存储的位置 数据库（mongodb）文件系统，内存
    store:new MongoStore({
        url:'mongodb://127.0.0.1/notes'
    })
}));
//使用此flash中间件，使用了它之后会在请求对象上多一个flash属性，flash是一个方法，传两个参数表示存储消息，传一个参数表示读取消息，读取之后立刻销毁
//app.use(flash(type,msg));app.use(flash(type));
app.use(flash());

//给模版附一些公共的变量
app.use((req,res,next)=>{
    //设置默认值
    //在中间件里把成功消息从flash中取出，然后赋给模版使用，读取的是数组，转成字符串
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    //一旦读取之后，此消息就被销毁了
    //每次服务器接收到请求后，把会话对象中的user属性取出来赋给模版的数据对象
    res.locals.user=req.session.user;
    next();
});

//用户路由
let user=require('./routes/user');
app.use('/notes',user);
//日记路由
let diary=require('./routes/diary');
app.use('/user',diary);
/*
//放首页路由
let index=require('./routes/index');
app.use('/',index);*/

//监听9090端口
app.listen(9090,()=>{
    console.log('ok');
});