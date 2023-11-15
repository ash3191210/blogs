const express = require('express')
const bodyparser=require('body-parser')
const app =express();
const ejs=require('ejs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs')

module.exports = app
