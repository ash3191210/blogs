const { commentservice } = require("../services/comment-ser");
const  {userservices} = require("../services/userservices.js");

class commentmiddleware{
     constructor(){
         this.commentservice =new commentservice();
         this.userservices = new userservices()
         this.createcomment = this.createcomment.bind(this)
         this.delcommnent= this.delcommnent.bind(this)
     }
     async createcomment(req,res,next){
        //console.log("req property :",req.body.comment)
        const username = req.query.who;
        const responseusername = await this.userservices.getuser(username);

        const comment={
          who:responseusername._id,
          commentOn:req.query.id,
          body: req.body.comment
        }
        req.user.username = username;
        try{
            const response = await this.commentservice.createcomment(comment);
            next()
        }
        catch(er){
            console.error(er);
            return res.json({
                success:false,
                messege:"there is an error"
            })
        }

     }

     async delcommnent(req,res,next){
        try{
           const id = req.query.id;
           const response = await this.commentservice.delcommnet(id);
           next()
        }
        catch(er){
            console.error(er);
            return res.json({
                 success:false,
                 messege:" something goine wrong"
            })
        }
     }
}

module.exports ={commentmiddleware}