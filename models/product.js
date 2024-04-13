const mogoose = require("mongoose")

const product = new mogoose.Schema({
    img:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

const productModel = new mogoose.model("product",product)

module.exports = productModel


