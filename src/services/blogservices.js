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
 }
 module.exports ={blogservices}