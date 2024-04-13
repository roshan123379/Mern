const mogoose = require("mongoose")
const jwt = require("jsonwebtoken")
const secret= "HELLOROSHAAMUBOLRHAAHU"
const register = new mogoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
register.methods.generateToken = function(){
    try {
        return jwt.sign({
            userId:this._Id,
            email:this.email,
            admin:this.admin
        },secret,
        {
            expiresIn:"30d"
        }) 
    } catch (error) {
        console.log(error)
    }
}
const registerModel = new mogoose.model("user",register)


module.exports=registerModel