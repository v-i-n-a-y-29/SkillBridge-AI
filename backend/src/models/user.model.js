const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'username already taken'],
        required:true
    },

    email:{
        type:String,
        unique:[true,'email  already exists'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const userModel = mongoose.model("users",userSchema) //inside the users model the userSchema will be stored
module.exports = userModel