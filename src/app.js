const app=require('./config/appconfig.js')
const {PORT}=require('./config/envconfig.js')


const appconnect = async()=>{
   app.listen(PORT,()=>{
       console.log('server is running....')
       console.log(`http://localhost:${PORT}`)
   })
}
appconnect()

