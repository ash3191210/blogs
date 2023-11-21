const { userservices } = require("../services/userservices")

this.userservices = new userservices()

const bindusertoreq= async(req,res,next)=>{
    try{
        const response = await this.userservices.getuser(req.body.username);
        if(!response || response.length===0){
            return res.json({
                 messege:"user does not exist"
            })
        }
         else {
            const username = req.body.username;
            const password=req.body.password;

           if(response.password==password){
            req.user={
                username:req.body.username,
                password:req.body.password
            }
            next()
           }
           else return res.json({
              messege:"password doese not match"
           })

        }
    } catch(er){
     
        return res.json({
            success:false,
            messege:er
        })
    }
    
    
}
module.exports ={bindusertoreq}