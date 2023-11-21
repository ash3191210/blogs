const{ Blog} = require('../models/blogmodel.js')


class blogrepo{
 
    async create(blog){
      try{
         const newblog= new Blog(blog)
         await newblog.save()
         return newblog;
      }
      catch(er){
         console.log("something wrong in blog creation ")
         throw er;

      }
    }
 
    async getallblogs(){
     try{
         const blogs = await Blog.find({});
         return blogs;
     }
     catch(er){
        console.log("something wrong in all blog getting ")
        throw er;
     }
   }
   async getblogsbytittle(tittle){
     try{
         const blogs = await Blog.find({
            tittle:{$regex:'.*'+tittle+'.*',$options: 'i' }
         }).exec();
         return blogs;
     }
     catch(er){
        console.log("something wrong in getting the particular blogs by tittle ")
        throw er;
     }
   }
 
  async deleteblog(id){
     try{
       const response= await Blog.findByIdAndDelete(id)
       return response;
     }
     catch(er){
        console.log("something wrong in deleating blog")
        throw er;
     }
  }
//   async updatecontent(id,newcontent){
//     try{
//        const response= await this.Blog.findOneAndUpdate
//     }
//   }
 
 }
 module.exports = {blogrepo}