const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    rapperName:String,
    birthName:String,
    likeCount:Number
})

module.exports=mongoose.model('rappers',schema);