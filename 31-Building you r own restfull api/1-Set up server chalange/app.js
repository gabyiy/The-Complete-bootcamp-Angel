const express =require("express")
const bodyParser= require("body-parser")
const mongoose =require("mongoose")
const ejs= require("ejs")

const app=express()



mongoose.connect("mongodb://localhost:27017/wikiDB")

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.use(express.static("public"))



const articleSchema= new mongoose.Schema({
    title:String,
    content:String
})

const Article = mongoose.model("Article", articleSchema)



app.get("/",(req,res)=>{

    res.render("index")
})



app.listen(3000,()=>{
    console.log("Server up on port 3000");
})