const mongoose = require("mongoose");
const { blogservices } = require("../services/blogservices");
const { commentservice } = require("../services/comment-ser");


class commentcontroller{
    constructor(){
         this.blogservices= new blogservices()
         this.commentservice = new commentservice()
         this.comment = this.comment.bind(this)
    }
    
    async comment(req,res){
       try{
    
        
        const comment ={
            body: req.body.comment,
            who: req.user.id,
            commentOn:req.query.id
        }

        const response = await this.commentservice.createcomment(comment)
       
        const result = await  this.blogservices.pushcomment(comment.commentOn,response._id)
        res.redirect('/blog/'+comment.commentOn)

       } 
       catch(er){
          console.log("something wrong in comment conttroller");
          console.log(er)
          res.redirect('/blogs')
       }      

    }
}
module.exports ={commentcontroller}