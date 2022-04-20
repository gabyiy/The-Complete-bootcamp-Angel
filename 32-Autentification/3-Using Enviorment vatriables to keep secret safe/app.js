//jshint esversion:6

//pentru a utilza encriptie utilizam mongoose-encryption
//pentru a utiliza variabile de enviormete pentr ucodificare utilizam dotenv din npmjs.com 
//trebuie sa creem o variabila env
//adaugam fisieru in git ignore ca nu se se salveze in github

require('dotenv').config() //asa am activat dotnev trebuie pusa prima
const express= require("express")
const ejs=require("ejs")
const bodyParser=require("body-parser")
const mongoose  = require("mongoose")
const encrypt =require ("mongoose-encryption")


const app=express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/usersDB")


//putem accsea variabilele locade enviormet asa 
 const secret =process.env.SECRET

//creem schema si modelu
const userSechama= new mongoose.Schema({
    email:String,
    password:Number
})

//si dupa adaucam ecryptu la userSchema si spunem ca vrem sa se utilize encriptia doar la email(se pot adaugam mai multe lucruri  la encripted adaugand de ex ["password","alt encript"])
userSechama.plugin(encrypt,{secret: process.env.SECRET ,encryptedFields:["password"]})

const User= mongoose.model("User",userSechama)

//setam pagina default
app.get("/",(req,res)=>{
    res.render("home")
})

//creem rutele pentru celelate pagini
app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/logout",(req,res)=>{
    res.render("home")
})

app.get("/submit",(req,res)=>{
res.render("submit")
})

//aducem ce avem in inputrile din register si le savam intrun nou user si le trimitem la baza de date 
app.post("/register",(req,res)=>{
  const   newUser= new User({
        email:req.body.username,
        password:req.body.password
    })
    newUser.save((err)=>{
        if(err){
            console.log(err);
        }else{
            //in caz ca nu avem erroare ne duca la pagina cu secrete
            res.render("secrets")
            console.log("user registered succesufuly");
        }
    })
})

//acum facem post la login 

app.post("/login",(req,res)=>{

    const username= req.body.username
    const password =req.body.password

//aici facem o verificare ca daca avem acest usuari sa ne duca la pagina secret cand facem login
  User.findOne({email:username},(err,foundUser) =>{
      if(err){
              console.log("accout not found");
        
      }else{
          if(foundUser){
        //   iar aici verificam daca ce avem in foundUser.passowrd este lafe cu cea introdusa de usuario ne face un render la secrets
        if(foundUser.password==password){

          res.render("secrets")

        }else{
            console.log("passowrd dident mach");
        }
    }else{
        res.send("no such user found")
    }}})

      
})


app.listen(3000,()=>{
console.log("server up on port 3000");
})