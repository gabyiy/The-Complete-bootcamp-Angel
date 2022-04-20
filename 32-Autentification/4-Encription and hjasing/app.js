//jshint esversion:6

//pentru a utilza encriptie utilizam mongoose-encryption
//pentru a utiliza variabile de enviormete pentr ucodificare utilizam dotenv din npmjs.com 
//trebuie sa creem o variabila env
//adaugam fisieru in git ignore ca nu se se salveze in github


// pentru a utiliza autetificare cu hash trebuie sa instalm md5  npmjs.com 

require('dotenv').config() //asa am activat dotnev trebuie pusa prima

const md5= require("md5") //importam md5 

var sha512 = require('js-sha512');//este mai bun ca md5
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




//creem schema si modelu
const userSechama= new mongoose.Schema({
    email:String,
    //paswordu o sa il faca in strign asa ca trebuie sa fie de tip string
    password:String
})



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
        password: md5(req.body.password)  //asa codificam parola cu hash
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
    const password =md5(req.body.password) //si aici transformam parola introdusa in hash atunci cand usuariu incearca un login

//aici facem o verificare ca daca avem acest usuari sa ne duca la pagina secret cand facem login
  User.findOne({email:username},(err,foundUser) =>{
      if(err){
             res.send("err");
        
      }else{
          if(foundUser){
        //   iar aici verificam daca ce avem in foundUser.passowrd este lafe cu cea introdusa de usuario ne face un render la secrets
        if(foundUser.password===password){

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