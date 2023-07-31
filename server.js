const { urlencoded,json } = require('body-parser');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
app.use(express.static(__dirname+'/public'));
app.use(urlencoded({extended:false}));
app.use(json());
const PORT=5000

//db connection 👇👇
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},{useUnifiedTopology:true})
.then(()=>{console.log("Db connected")})
.catch((err)=>console.error(err))
const rappers=require('./rapperSchema');

app.set('view engine','ejs');

app.listen(PORT,()=>{
    console.log(`server running at localhost:${PORT}`);
})

app.get('/',async(req,res)=>{
    let data=await rappers.find({});
    let obj={
        rappers:data
    }
    res.render('main.ejs',obj);
})

app.delete('/deleteRapper',async(req,res)=>{
    let sName=req.body.stageName;
    let bName=req.body.birthName;

    try{
        await rappers.deleteOne({rapperName:sName,birthName:bName}).then((err)=>{
            if(err) console.log(err);
            else console.log("documetn deleted successfully");
        });
        res.json("Rapper deleted");
    }
    catch(e){
        console.log(e);
    }
    

})

app.post('/submitData',async(req,res)=>{
    const obj={
        rapperName:req.body.stageName,
        birthName:req.body.birthName,
        likeCount:0
    }
    try{
        await rappers.create(obj);
    }
    catch(e){
        console.log(e);
    }
    res.json("rapper added");
})

app.put('/increaseLike',async (req,res)=>{
    let sName=req.body.stageName;
    let bName=req.body.birthName;
    let lCount=req.body.likeCount;

    try{
        await rappers.updateOne(
            {rapperName:sName,birthName:bName},
            {likeCount:Number(lCount)+1}
            )
        res.json("Like increased");
    }
    catch(e){
        console.log(e);
    }
})

