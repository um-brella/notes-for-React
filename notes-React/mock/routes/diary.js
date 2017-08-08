let express=require('express');
let router=express.Router();
let {Diary} =require('../model');
let multer = require('multer');
let upload=multer({dest:'./public'});

//增加文章
router.post('/add',upload.single('picture'),(req,res)=>{
    let diaryAdd=req.body;
    let picturePath=req.file?`http://localhost:9090/${req.file.filename}`:'';
    diaryAdd.picture=picturePath;
    diaryAdd.author=req.session.user._id;
    Diary.findOne({title:diaryAdd.title},(err,oldDiaryTitle)=>{
        if(err){
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            if(oldDiaryTitle){
                req.flash('error','标题名重复');
                res.send({'error':'标题名重复'});
            }
            else {
                Diary.create(diaryAdd,(err,doc)=>{
                    if(err) {
                        req.flash('error',err.toString());
                        res.send({'error':err.toString()});
                    }
                    else {
                        req.flash('success','添加日记成功');
                        res.send({'success':'添加日记成功'});
                        //res.redirect('/');
                    }
                })
            }
        }
    })
});

//查看日记列表
router.get('/list',(req,res)=>{
    //populate把一个属性从ID变成此ID对应的对象
    Diary.find({author:req.session.user._id}).populate('author').exec((err,articles)=>{
        articles.forEach((item)=> {
            item.Localtime=item.createAt.toLocaleString();
        });
        res.send(articles)//从模版根目录下面找
    });
});

//展示日记
router.get('/detail/:_id',(req,res)=>{
    let _id=req.params._id;
    Diary.findById(_id).populate('author').exec((err,article)=>{
        res.send(article)
    })
});

//删除日记
router.get('/delete/:_id',(req,res)=>{
    let _id=req.params._id;
    Diary.remove({_id},(err,result)=>{
        if(err) {
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            req.flash('success','删除日记成功');
            res.send({'success':'删除日记成功'});
        }
    })
});

//更新日记
router.post('/update/:_id',upload.single('picture'),(req,res)=>{
    let _id=req.params._id;
    let diaryUpDate=req.body;
    let pictureUpDatePath='';
    if(req.file){
        pictureUpDatePath=`http://localhost:9090/${req.file.filename}`;
    }
    else if(diaryUpDate.picture.match(/^http/)){
        pictureUpDatePath=diaryUpDate.picture;
    }
    diaryUpDate.picture=pictureUpDatePath;
    Diary.update({_id},diaryUpDate,(err,result)=>{
        if(err){
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            req.flash('success','更新日记成功');
            res.send({'success':'更新日记成功'});
        }
    })
});
/*
//修改文章
router.get('/update/:_id',(req,res)=>{
    let _id=req.params._id;
    Category.find({user:req.session.user._id},(err,categories)=>{
        Article.findById(_id).exec((err,article)=>{
            res.render('article/add',{article,categories,title:'修改文章'});
        })
    })
});
*/
module.exports=router;