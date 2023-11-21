const express = require('express')
const usercontroller= require('../controllers/usercontroller.js');
const { blogcontroller } = require('../controllers/blogcontroller.js');
const { bindusertoreq } = require('../middlewares/login-middleware.js');


const router=express.Router()
this.usercont=new usercontroller()
this.blogcontroller=new blogcontroller();

router.get('/',this.usercont.redgisterpage)
router.post('/', this.usercont.createuser)
router.get('/login',this.usercont.loginpage)
router.post('/login',bindusertoreq,this.blogcontroller.getallblogs)
// router.post('/del',this.usercont.deleateuser)
// router.post('/update',this.usercont.updatepassword)
 router.get('/all',this.usercont.getalluser)
// router.get('/user/one',this.usercont.getuser)
// router.post('/blog',this.blogcontroller.create)
// router.get('/blog/tittle',this.blogcontroller.getblogbytittle)
 


module.exports = router