require("dotenv").config()
const app = require("./src/app")
const connectToDb = require('./src/config/database')

connectToDb()

app.listen(3000,()=>{
    console.log("the server is runnin on port 3000")
})

