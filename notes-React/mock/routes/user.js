let express=require('express');
let router=express.Router();
let {User} =require('../model');

let multer = require('multer');
let upload=multer({dest:'./public'});
//提交用户注册表单
router.post('/signup',upload.single('avatar'),(req,res)=>{
    let user=req.body;
    //user.avatar=`/${req.body.avatar}`;
    user.avatar=`http://localhost:9090/${req.file.filename}`;
    //找一个数据库里有没有跟自己用户名相同的用户
    User.findOne({username:user.username},(err,oldUser)=>{
        if(err) {
            //写入一个错误的消息
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            if(oldUser){
                //写入一个失败的消息
                req.flash('error','用户名已存在');
                res.send({'error':'用户名已存在'});
            }
            else {
                User.create(user,(err,doc)=>{
                    if(err) {
                        //写入一个错误的消息
                        req.flash('error',err.toString());
                        res.send({'error':err.toString()});
                    }
                    else {
                        //写入一个成功的消息
                        req.flash('success','注册成功');
                        res.send({'success':'注册成功'})
                        //res.redirect('/user/signin');
                    }
                })
            }
        }
    });
});

router.post('/signin',(req,res)=>{
    let user=req.body;
    //找一个数据库里有没有跟自己用户名相同的用户
    User.findOne(user,(err,oldUser)=>{
        if(err) {
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            if(oldUser){
                req.flash('success','登陆成功');
                //如果登陆成功之后，会把查询到的用户对象赋给会话对象的user属性
                req.session.user=oldUser;
                res.send({'success':'登陆成功'})
                //res.redirect('/');
            }
            else {
                req.flash('error','用户名或密码错误');
                res.send({'error':'用户名或密码错误'});

            }
        }
    });
});
//个人中心页面
router.get('/signin',(req,res)=>{
    res.send(req.session.user);
});

router.get('/signout',(req,res)=>{
    //把session的user属性设置为null就变成了未登录态
    req.session.user=null;
    res.send('已退出账号');
    //res.redirect('/user/signin');
});

module.exports=router;