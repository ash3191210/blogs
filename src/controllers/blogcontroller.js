const { json } = require("body-parser");
const { blogservices } = require("../services/blogservices.js");
const { commentservice } = require("../services/comment-ser.js");
const { userservices } = require("../services/userservices.js");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");


class blogcontroller{
     constructor(){
        this.blogservices=new blogservices();
        this.userservices=new userservices();
        this.commentservice = new commentservice();

        this.create = this.create.bind(this);
        this.getblogbytittle =this.getblogbytittle.bind(this);
        this.getallblogs=this.getallblogs.bind(this)
        this.getblogbyid=this.getblogbyid.bind(this)
        this.getblogbyauthor=this.getblogbyauthor.bind(this);
        this.blogedit=this.blogedit.bind(this);
        this.editblogbyid=this.editblogbyid.bind(this);
        this.deleteblogbyid=this.deleteblogbyid.bind(this);

     }
     async  createblogpage(req,res){
         res.render('create_blogs',{username:req.user.username})
     }
     async create(req,res){
        
        try{
         const blog={
            tittle:req.body.tittle,
            topic:req.body.topic,
            author:req.user.id,
            content:req.body.content
        }
        const response = await this.blogservices.createblog(blog)
        res.redirect('/create/blog')
        }
        catch(er){
            console.error("error : ",er)
            res.json({
                success:false,
                mesage:er
            })
        }
     }

     async getallblogs(req,res){
        try{
           let limit=3;
           let page =1,search='';
           if(req.query.search) search=req.query.search
           if(req.query.page) page=Number(req.query.page);
           
           const carry = await this.blogservices.getpaginatedblog(limit,page,search)
           const blogs=carry.response
           const temp=carry.totalpage
           const totalpage = Math.ceil(temp/limit);

           const pageinfo={
             totalpage,
             search,
             nextpage:Math.min(totalpage,page+1),
             prevpage:Math.max(page-1,1)
           }
        //    console.log("info : ",page-(-1))
         
            const userinfo=await this.userservices.getuser(req.user.username);
            const imgurl=userinfo.image;

            res.render("blogs",{username:req.user.username,imgurl,blogs:blogs,pageinfo:pageinfo})
        } 
        
        
        catch(er){
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

     async getblogbyid(req,res){
        try {
           const blogid= req.params.id;
           //console.log("blog id : ",blogid);
           const user = req.user.username;

           const response= await this.blogservices.getblogbyid(blogid);
           const blogs={
             username:req.user.username,
             blog:response
           }
           res.render('blogbyid',{blogs:blogs})


            
        } catch (error) {
             console.error("somedthing wrong in getblogbyid in blogcontroller");
             throw(error)

        }
     }
    
     async getblogbyauthor(req,res){
       try {
          const author = req.params.username;
          const response = await this.blogservices.getblogbyauthor(author)

          const blogs={
            username: req.user.username,
            blog:response
          }
         res.render('yourblogs',{blogs:blogs})

       } catch (error) {
          console.error("something wrong in blogcontroller"+error)
          throw(error)
       }
     }
     async blogedit(req,res){
        try {
           const response = await this.blogservices.getblogbyid(req.params.id);
           const blogs={
             username:req.user.username,
             blog:response

           }
           //console.log("response",response);
           res.render('editblog',{blogs:blogs});

        } catch (error) {
           console.error("something wrong in blogcontroller"+error);
           throw(error)
        }
     }
     async editblogbyid(req,res){
       try {
         const update={
            tittle: req.body.tittle,
            topic: req.body.topic,
            content: req.body.content
         }
         const bid= new mongoose.Types.ObjectId(req.params.id)
         const response = await this.blogservices.editblogbyid(bid,update);
         return res.redirect('/blog/user/'+req.user.username)
   
       } catch (error) {
          console.error("something wrong in blogcontroller ",error);
          throw(error)
       }
     

}
  async deleteblogbyid(req,res){
     try {
        const blogid = new mongoose.Types.ObjectId(req.params.id)
        const response=await this.blogservices.deleteblogbyid(blogid);
        return res.redirect('/blog/user/'+req.user.username)
     } catch (error) {
        console.error("something wrong in blog conrtoller",error);
        throw(error)
     }
  }


}

module.exports ={
    blogcontroller
}