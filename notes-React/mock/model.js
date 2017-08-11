//先引入mongoose模块
let mongoose=require('mongoose');
mongoose.Promise=Promise;
let ObjectId=mongoose.Schema.Types.ObjectId;
//链接你的mongodb数据库
let conn=mongoose.createConnection('mongodb://127.0.0.1/notes');
//3.定义数据库集合的骨架模型，定义集合中文档的字段的名称和字段的类型
let userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
//定义模型
let User=conn.model('User',userSchema);
//导出
exports.User=User;

/*
//文章分类的骨架模型
let CategorySchema=new mongoose.Schema({
    categoryName:String,
    //外键就是别人家的主键,
    //ObjectId 是主键 _id的类型，这个user属性是一个外键，引用的是User集合的主键
    user:{type:ObjectId,ref:'User'}
});
let Category=conn.model('Category',CategorySchema);
exports.Category=Category;
*/

//笔记的骨架模型
let NotesSchema=new mongoose.Schema({
    title:String,
    content:String,
    localtime:String,
    //文章的分类
    //category:{type:ObjectId,ref:'Category'},
    //创建时间类型是日期类型，默认值是Date.now，default默认值
    createAt:{type:Date,default:Date.now},
    //外键就是别人家的主键,
    //ObjectId 是主键 _id的类型，这个user属性是一个外键，引用的是User集合的主键
    author:{type:ObjectId,ref:'User'},
    Localtime:String
});
let Notes=conn.model('Diary',NotesSchema);
exports.Notes=Notes;
