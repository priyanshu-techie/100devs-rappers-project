const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
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