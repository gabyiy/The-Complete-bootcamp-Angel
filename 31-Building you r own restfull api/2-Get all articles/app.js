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


// aici specificam ruta (adica colectia articles,dupa port 3000punem /articles), si dupa facem o catutare la tot ce avem in colectie
app.get("/articles",(req,res)=>{

    Article.find({},(err,foundArticles)=>{
        if(err){
            res.send(err);
        }else{
            // asa le trimite la pagina articles
           res.send(foundArticles);
        }
    })

  
})



app.listen(3000,()=>{
    console.log("Server up on port 3000");
})