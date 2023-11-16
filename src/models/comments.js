const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
    commentOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    body:{
        type:String,
        required:true,
        min:[1,'too few']
    },
    date:{
        type:Date
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentschema);
module.exports= Comment