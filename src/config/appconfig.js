const express = require('express')
const bodyparser=require('body-parser')
const app =express();
const ejs=require('ejs')
const router=require('../routes/primary.js')
const cookieparser = require('cookie-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())
app.set('view engine','ejs')
app.use('/',router)


module.exports = app
