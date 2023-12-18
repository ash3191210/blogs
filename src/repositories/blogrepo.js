const mongoose = require('mongoose');
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

  async getblogwithlimit(limit,page,search){
     try {
      // const totalpage = await Blog.find({
      //    $or:[{tittle:{$regex:'.*'+search+'.*',$options:'i'}},
      //    {topic:{$regex:'.*'+search+'.*',$options:'i'}}
      //  ]
      //  }).countDocuments();
   
      //  const Blogs=await Blog.find({
      //    $or:[{tittle:{$regex:'.*'+search+'.*',$options:'i'}},
      //     {topic:{$regex:'.*'+search+'.*',$options:'i'}}
      //  ]
      //  }).skip((page-1)*limit).limit(limit).exec();
      const docs= await Blog.aggregate([{$lookup:{from:'users',localField:'author',foreignField:'_id',as:'newfield'}},{$unwind:'$newfield'},{$match:{ $or:[{tittle:{$regex:'.*'+search+'.*',$options:'i'}},
      {topic:{$regex:'.*'+search+'.*',$options:'i'}},{"newfield.username":{$regex:'.*'+search+'.*',$options:'i'}}
   ]}}])

   const totalpage=docs.length;
   
   const Blogs=await Blog.aggregate([{$lookup:{from:'users',localField:'author',foreignField:'_id',as:'newfield'}},{$unwind:'$newfield'},{$match:{ $or:[{tittle:{$regex:'.*'+search+'.*',$options:'i'}},
   {topic:{$regex:'.*'+search+'.*',$options:'i'}},{"newfield.username":{$regex:'.*'+search+'.*',$options:'i'}}
]}}]).skip((page-1)*limit).limit(limit).exec();

       const response={
          totalpage,
          Blogs
       }
       return response
       
     } catch (error) {
        console.error(" there is error in getblog with limit repo")
        throw error
     }
  }

  async pushcomment(bid,cid){
     try {
      const id=new mongoose.Types.ObjectId(bid)
      const response = await Blog.findOneAndUpdate({_id:id},{$push:{comment:cid}},{new:true})
      return response
     } catch (error) {
        throw error
     }
      
  }
  async getcommentsonblog(bid){
     try {
        const response = await Blog.findOne({_id:bid});
        const comments=  response.comment;
        return comments;
     } catch (error) {
        throw error
     }
  }

  async getblogbyid(id){
    try {
      const response = await Blog.findOne({_id:id}).populate({path:'author', select:'username'})
      .populate({path:'comment' , populate:{path:'who',select:'username'}}).exec();
      return response;
    } catch (error) {
       console.error("something wrong in blogrepo");
       throw(error)
    }
  }
//   async updatecontent(id,newcontent){
//     try{
//        const response= await this.Blog.findOneAndUpdate
//     }
//   }
 
 }
 module.exports = {blogrepo}