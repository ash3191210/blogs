 const{ blogrepo}=require('../repositories/blogrepo.js');
const { userservices } = require('./userservices.js');


 class blogservices{
    constructor(){
        this.blogrepo=new blogrepo()
        this.userservices=new userservices()
    }
    async createblog(blog){
        try{
            const response = await this.blogrepo.create(blog);
            return response;
        } catch(er){
           throw {er}
        }
    }
    async getallblogs(){
        const response = await this.blogrepo.getallblogs()
        return response;
    }
    async getblogbyid(id){
        try {
            const response = await this.blogrepo.getblogbyid(id);
            return response;
             
        } catch (error) {
            console.error("something wrong in blog services");
            throw(error)
        }
    }
     
    async getpaginatedblog(limit,page,search){
        try {
            
            const carry = await this.blogrepo.getblogwithlimit(limit,page,search);
            const totalpage = carry.totalpage;
            const response= carry.Blogs;

            // let blogs=[]
            // for(let i=0;i<response.length;i++){
            //    const author = await this.userservices.getuserbyid(response[i].author)
            //    const temp={
            //     ...response[i],author:author
            //    } 
            //    blogs.push(temp);
            // } 

            const final={
                response,
                totalpage
            }
            
           return final;
        } catch (error) {
            console.log("something wrong in getpaginated blog function");
            throw error
        }
    }

    async getcommentonblog(bid){
      try {
         const comments = this.blogrepo.getcommentsonblog(bid);
         return comments;
      } catch (error) {
         throw er
      }
    }
    async getblogbytittle(tittle){
        try{

          const response = await this.blogrepo.getblogsbytittle(tittle);
          return response;
            
        } catch(er){
            throw er 
        }
    }
    async pushcomment(bid,cid){
        try{
            const response = await this.blogrepo.pushcomment(bid,cid);
            return response;
        }
        catch(er){
            throw er
        }
    }
    async getblogbyauthor(author){
        try {
            const response = await this.blogrepo.getblogbyauthor(author)
            return response;

        } catch (error) {
            console.error("something wrong in blogservices"+error);
            throw(error)
        }
    }
    async editblogbyid(id,update){
        try {
            
            const response = await this.blogrepo.editblogbyid(id,update);
            return response;

        } catch (error) {
              console.error('something wrong in blogservices'+error);
              throw(error)
        }
    }
    async deleteblogbyid(id){
         try {
            const response = await this.blogrepo.deleteblogbyid(id);
            return response;
         } catch (error) {
            console.error('something wrong in blogservices'+error);
              throw(error)
         }
    }
 }
 module.exports ={blogservices}