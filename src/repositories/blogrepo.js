const Blog = require('../models/blogmodel.js')


class blogrepo{
    async create(blog){
      const newblog = new Blog(blog);
      try{
         await newblog.save()
      }
      catch(er){
         console.log("something wrong in blog creation ")
         console.error(er);
      }
    }
 
    async getallblogs(){
     try{
         const blogs = await Blog.find({});
         return blogs;
     }
     catch(er){
        console.log("something wrong in all blog getting ")
        console.error(er);
     }
   }
   async getblogsbytittle(tittle){
     try{
         const blogs = await Blog({
            tittle:{$regex:/tittle/,$options: 'i' }
         });
         return blogs;
     }
     catch(er){
        console.log("something wrong in getting the particular blogs by tittle ")
        console.error(er);
     }
   }
 
  async deleteblog(id){
     try{
        await Blog.findByIdAndDelete(id)
     }
     catch(er){
        console.log("something wrong in deleating blog")
        console.error(er);
     }
  }
 
 }
 module.exports = blogrepo