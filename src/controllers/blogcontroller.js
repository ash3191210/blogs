const { blogservices } = require("../services/blogservices.js");
const { commentservice } = require("../services/comment-ser.js");
const { userservices } = require("../services/userservices.js");
const jwt = require('jsonwebtoken')


class blogcontroller{
     constructor(){
        this.blogservices=new blogservices();
        this.userservices=new userservices();
        this.commentservice = new commentservice();

        this.create = this.create.bind(this);
        this.getblogbytittle =this.getblogbytittle.bind(this);
        this.getallblogs=this.getallblogs.bind(this)
        this.getblogbyid=this.getblogbyid.bind(this)
        this.getblogbyauthor=this.getblogbyauthor.bind(this)

     }
     async  createblogpage(req,res){
         res.render('create_blogs',{username:req.user.username})
     }
     async create(req,res){
      
        const blog={
            tittle:req.body.tittle,
            topic:req.body.topic,
            author:req.user.id,
            content:req.body.content
        }
        try{
            const response = await this.blogservices.createblog(blog)
           res.redirect('/create/blog')
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
        
            res.render("blogs",{username:req.user.username,blogs:blogs,pageinfo:pageinfo})
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

}
module.exports ={
    blogcontroller
}