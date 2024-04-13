const registerModel = require("./models/registerModel")
const bcrypt = require("bcryptjs")
const productModel = require("../server/models/product")
const contactModel =require("../server/models/contact")
const home = async(req,res)=>{
    res.send("hello new home")
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    
 
    const emailExist = await registerModel.findOne({ email });
    if (emailExist) {
       res.send({ msg: "User already exists" });
    } else {

        const hashPassword = await bcrypt.hash(password,10)
       const createUser = await registerModel.create({ username, email, password:hashPassword });
       if (createUser) {
          res.send({ msg: "Created successfully" , createUser, Token: await createUser.generateToken() });
       } else {
          res.send({ msg: "Error creating user" });
       }
    }
 };
 
 const login = async(req,res)=>{
    const { email, password } = req.body;
    
    const exists = await registerModel.findOne({email})
    if(!exists){
        res.send({msg:"register firs"})
    }
 
    const comparePass = await bcrypt.compare(password,exists.password)
    if(comparePass){
        res.send({msg:"login successfull",Token: await exists.generateToken() })
    }
   
 }
 const userData = async (req, res) => {
    try {
        const Data = req.user
        console.log(Data)
        res.status(200).send({ Data })
    } catch (error) {
        console.log("user Data error", error)
        res.status(400).send({msg:"user data error"})
    }

}

 const service = async (req, res) => {
    try {
        const serviceData = await productModel.find()
        console.log(serviceData)
        res.status(200).send({ msg: serviceData })
        if (!serviceData) {
            res.status(400).send({ msg: "data not found" })
        }
    } catch (error) {
        console.log("service error", error)
    }

}
const contact = async (req, res) => {
    try {
        const { username,phone, email, message } = req.body

        await contactModel.create({ username, phone, email, message })

        return res.status(200).json({ msg: "contact submitted" })


    } catch (error) {
        return res.status(400).json({ msg: "not contact submitted" })

    }
}
module.exports = {home,register,login, service,contact,userData}