const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
    who:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    commentOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
    },
    body:{
        type:String,
        required:true,
        min:[1,'too few']
    },
   
},{timestamps:true})

const Comment = mongoose.model('Comment',commentschema);
module.exports= {Comment}