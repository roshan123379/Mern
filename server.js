require("dotenv").config()
const PORT = process.env.PORT || 8000
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
const cors = require("cors")
 
const corOptions = {
    origin:"https://luminous-pixie-df1000.netlify.app",
    methods:"GET ,POST ,PUT ,DELETE,PATCH",
    Credential:true


}
app.use(cors(corOptions))
app.use(express.json())
const router = require("./router")
const db = require("./db")
app.use("/api/auth",router)


app.get("/",(req,res)=>{
    res.send("hello home")
})


db().then(()=>{
    app.listen(PORT)
})




