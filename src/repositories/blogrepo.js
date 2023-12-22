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

async getblogbyauthor(author){
   try {
      
     const aggregate =await Blog.aggregate([
      
      {$lookup:{
         from:'users',
         foreignField:'_id',
         localField:'author',
         as:'user_info',
         pipeline:[
            {$project:{'username':1}}
         ]
      }},
      {$unwind:{path:'$user_info',preserveNullAndEmptyArrays:true}}
      ,
      {
         $lookup:{
            from:'comments',
            localField:'comment',
            foreignField:'_id',
            as:'comment_info',
            pipeline:[
               {$project:{"commentOn":0}}
            ]
         }
      }
       ,{$unwind:{path:'$comment_info',preserveNullAndEmptyArrays:true}}
      ,
      {
         $lookup:{
            from:'users',
            localField:'comment_info.who',
            foreignField:'_id',
            as:'who',
            pipeline:[
               {$project:{username:1}}
            ]
         } 
      }
       ,{$unwind:{path:'$who',preserveNullAndEmptyArrays:true}}
       ,
       {$project:{comment:0,author:0}},
       {$match:{
         $expr:{
            $eq:['$user_info.username',author]
         }
       }},
      {
         $group:{
            _id:'$_id',comment:{$push:{'comment_info':'$comment_info','who':'$who'}},
            tittle:{$addToSet:'$tittle'},author_info:{$addToSet:'$user_info'},
            content:{$addToSet:'$content'},
         }
         
      },{
         $unwind:'$tittle'
      },{
         $unwind:'$content'
      },{
         $unwind:'$author_info'
      }

     ])
      return aggregate;
      
   } catch (error) {
      console.error('something wrong in blogrepo'+error);
      throw(error)
   }
}

 async editblogbyid(id,update){
     try {
         const response = await Blog.findByIdAndUpdate(id,update,{
            new:true
         });
         return response;
          
     } catch (error) {
        console.error("something wrong in blogrepo",error);
        throw(error)
     }
 }
 async deleteblogbyid(id){
   try {
     const response = await Blog.findByIdAndDelete(id,{new:true})
     return response;
       
  } catch (error) {
     console.error("something wrong in blogrepo",error);
     throw(error)
  }
 }
 
 }
 module.exports = {blogrepo}