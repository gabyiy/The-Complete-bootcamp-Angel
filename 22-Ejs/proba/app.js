const express  =require("express")
const app=express()

const bodyParser=require("body-parser")

 app.use(bodyParser.urlencoded({extended:true}))

 app.set("view engine", "ejs")

 let items=["bere","cola"]

const text ="To Do List"
app.get("/",function(req,res){
    res.render("test",{text:text,items:items})
})

app.post('/',function(req,res){
    let item= req.body.newItem
    items.push(item)
    res.redirect('/')
})
app.listen(3000,function(){
    console.log("Up runing on server 3000")
})