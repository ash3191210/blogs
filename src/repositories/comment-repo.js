const {Comment} = require('../models/comments.js')
class commentrepo{
   async createcomment(comment){
      const newcomment= new Comment(comment);
    const response=  await Comment.create(comment)
    return response  
   }

   async getcomment(cid){
      const response = await Comment.findOne({_id:cid});
      return response;
   }
  
   async delcomment(id){
     const response= await Comment.findOneAndDelete({id:id});
     return response;
   }
}

module.exports = {commentrepo}