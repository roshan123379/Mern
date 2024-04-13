const uri = process.env.URL
const mongoose = require("mongoose")
const db = async()=>{
    try {
        const connect = await mongoose.connect(uri)
        if(connect){
            console.log("success")
        }
    } catch (error){
        console.log("connnection err",error)
    }
}

module.exports = db