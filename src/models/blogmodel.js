const mongoose = require('mongoose')

const blogschema = new mongoose.Schema({
   tittle:{
     type:String,
     required:true,
   },
   content:{
     type:String,
     require:true
   },
   comment:{
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Comment'
   },
   date:{
      type:Date
   },
   author:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
   },
   likes:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Like'
   }
},{timestamps:true})

const Blog = mongoose.model('Blog',blogschema);
module.exports = {Blog}