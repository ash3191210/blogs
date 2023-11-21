 const{ blogrepo}=require('../repositories/blogrepo.js');
const { userservices } = require('./userservices.js');


 class blogservices{
    constructor(){
        this.blogrepo=new blogrepo()
        this.userservices=new userservices()
    }
    async createblog(username,blog){
        try{
            const userresponse = await this.userservices.getuser(username);
            const userid = userresponse._id;
            blog.author=userid;
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
    async getblogbytittle(tittle){
        try{

          const response = await this.blogrepo.getblogsbytittle(tittle);
          return response;
            
        } catch(er){
            throw er 
        }
    }
 }
 module.exports ={blogservices}