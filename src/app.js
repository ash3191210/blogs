const app=require('./config/appconfig.js')
const {PORT}=require('./config/envconfig.js')
const {MONGO_URL}=require('./config/envconfig.js')
const connectDB = require('./config/dbconfig.js')


const appconnect = async()=>{
    await connectDB(MONGO_URL)

   app.listen(PORT,()=>{
       console.log('server is running....')
       console.log(`http://localhost:${PORT}`)
   })
}
appconnect()

