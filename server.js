const { urlencoded } = require('body-parser');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
app.use(express.static(__dirname+'/public'));
app.use(urlencoded({extended:true}));
const PORT=5000

//db connection 👇👇
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},{useUnifiedTopology:true})
.then(()=>{console.log("Db connected")})
.catch((err)=>console.error(err))
const rappers=require('./rapperSchema');
const bodyParser = require('body-parser');

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

app.post('/submitData',async(req,res)=>{
    // console.log(req.body);

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
    res.redirect('/');

})