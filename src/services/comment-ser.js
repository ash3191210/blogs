const { commentrepo } = require("../repositories/comment-repo");

class commentservice{
   constructor(){
     this.commentrepo = new commentrepo();
     this.createcomment=this.createcomment.bind(this)
   }

   async createcomment(comment){
     const response =await this.commentrepo.createcomment(comment)
     return response
   }
   async delcommnet(id){
     const response =await this.commentrepo.delcomment(id);
     return response;
   }
   async getcomment(cid){
     try {
        const response = await this.commentrepo.getcomment(cid);
        return response;
     } catch (error) {
        throw er
     }
   }
}

module.exports ={commentservice}