const { blogservices } = require("../services/blogservices.js");
const { userservices } = require("../services/userservices.js");


class blogcontroller{
     constructor(){
        this.blogservices=new blogservices();
        this.userservices=new userservices();
        this.create = this.create.bind(this);
        this.getblogbytittle =this.getblogbytittle.bind(this);
        this.getallblogs=this.getallblogs.bind(this)

     }

     async create(req,res){
        const username=req.body.username;

        const blog={
            tittle:req.body.tittle,
            content:req.body.content
        }
        try{
            const response = await this.blogservices.createblog(username,blog)
            res.json({
                sucess:true,
                message:"great"
            })
        }catch(er){
            console.error("error : ",er)
            res.json({
                success:false,
                mesage:er
            })
        }
     }

     async getallblogs(req,res){
        try{
            let response = await this.blogservices.getallblogs()
             var blogs=[]
            for(let i=0;i<response.length;i++){
                const username=await this.userservices.getuserbyid(response[i].author)
                const temp={...response[i],modauthor:username.username}
                blogs.push(temp);
            }
          console.log("blogs : ",blogs)
            res.render("blogs",{username:req.user.username,blogs:blogs})
        } catch(er){
            console.error("error : ",er)
            res.json({
                success:false,
                mesage:er
            })
        }

     }
     async getblogbytittle(req,res){
        try{
             const tittle=req.body.tittle;
    
             const response = await this.blogservices.getblogbytittle(tittle);
          
             res.json({
                success:true,
                message:response
             })
        } catch(er){
             res.json({
                success:false,
                message:er
             })
        }
     }
}
module.exports ={
    blogcontroller
}