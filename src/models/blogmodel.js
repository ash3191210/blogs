const mongoose = require('mongoose')
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM().window;
const DOMPurify = createDOMPurify(window);
const {stripHtml} = require('string-strip-html')


const blogschema = new mongoose.Schema({
   tittle:{
     type:String,
     required:true,
   },
   topic:{
     type:String,
     require:true
   },
   content:{
     type:String,
     require:true
   },
   preview:{
     type:String
   }
   ,
   comment:[{
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Comment'
   }],
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

blogschema.pre('save',function(next){
   if(this.content){
      this.content = DOMPurify.sanitize(this.content);
      this.preview =stripHtml(this.content.substring(0,20)).result
   }
   next()
})

const Blog = mongoose.model('Blog',blogschema);
module.exports = {Blog}