const express = require('express')
const usercontroller= require('../controllers/usercontroller.js');
const { blogcontroller } = require('../controllers/blogcontroller.js');
const { bindusertoreq } = require('../middlewares/login-middleware.js');
const { commentmiddleware } = require('../middlewares/comment-middleware.js');

const cookieparser = require('cookie-parser');
const {validateuser} = require('../middlewares/validate-middle.js');
const { commentcontroller } = require('../controllers/comment-controller.js');




const router=express.Router()
router.use(cookieparser())
this.usercont=new usercontroller()
this.blogcontroller=new blogcontroller();
this.commentmiddleware =new commentmiddleware();
this.commentcontroller = new commentcontroller();


router.get('/',this.usercont.redgisterpage)

router.get('/login',this.usercont.loginpage)
router.post('/login',this.usercont.login)
router.get('/all',this.usercont.getalluser)
router.post('/comment',validateuser,this.commentcontroller.comment)
router.get("/blogs",validateuser,this.blogcontroller.getallblogs)
// router.get('/user/one',this.usercont.getuser)
 router.get('/create/blog',validateuser,this.blogcontroller.createblogpage)
 router.post('/create/blog',validateuser,this.blogcontroller.create)
 router.get('/blog/:id',validateuser,this.blogcontroller.getblogbyid)
// router.get('/blog/tittle',this.blogcontroller.getblogbytittle)
 


module.exports = router