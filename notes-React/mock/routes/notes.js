let express=require('express');
let router=express.Router();
let {Notes} =require('../model');

//增加文章
router.post('/add',(req,res)=>{
    let diaryAdd=req.body;
    diaryAdd.author=req.session.user._id;
    Notes.findOne({title:diaryAdd.title},(err,oldDiaryTitle)=>{
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
                Notes.create(diaryAdd,(err,doc)=>{
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

//查看笔记列表
router.get('/list',(req,res)=>{
    //populate把一个属性从ID变成此ID对应的对象
    Notes.find({author:req.session.user._id}).populate('author').exec((err,articles)=>{
        articles.forEach((item)=> {
            item['localtime']=item.createAt.toLocaleString();
        });
        res.send({articles:articles||{}})//从模版根目录下面找
    });
});

//展示日记
router.get('/show/:_id',(req,res)=>{
    let _id=req.params._id;
    Notes.findById(_id).populate('author').exec((err,article)=>{
        res.send({article:article||{}})
    })
});

//删除笔记
router.get('/delete/:_id',(req,res)=>{
    let _id=req.params._id;
    Notes.remove({_id},(err,result)=>{
        if(err) {
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            req.flash('success','删除笔记成功');
            res.send({'article':{},'success':'删除笔记成功'});
        }
    })
});

//更新笔记
router.post('/update/:_id',(req,res)=>{
    let _id=req.params._id;
    let notesUpDate=req.body;

    Notes.update({_id},notesUpDate,(err,result)=>{
        if(err){
            req.flash('error',err.toString());
            res.send({'error':err.toString()});
        }
        else {
            req.flash('success','更新笔记成功');
            res.send({'article':{},'success':'更新笔记成功'});
        }
    })
});
module.exports=router;