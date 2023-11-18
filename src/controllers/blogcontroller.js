const { blogservices } = require("../services/blogservices.js");
const { userservices } = require("../services/userservices.js");


class blogcontroller{
     constructor(){
        this.blogservices=new blogservices();
        this.userservices=new userservices();
        this.create = this.create.bind(this)
     }

     async create(req,res){
        const username=req.body.username;

        const blog={
            tittle:req.body.tittle,
            content:req.body.content
        }
        try{
            const response = await this.blogservices.createblog(username,blog)
            console.log(response)
            res.json({
                sucess:true,
                message:response
            })
        }catch(er){
            console.error("error : ",er)
            res.json({
                success:false,
                mesage:er
            })
        }
     }
}
module.exports ={
    blogcontroller
}