//jshint esversion:6

//pentru a utilza encriptie utilizam mongoose-encryption
//pentru a utiliza variabile de enviormete pentr ucodificare utilizam dotenv din npmjs.com 
//trebuie sa creem o variabila env
//adaugam fisieru in git ignore ca nu se se salveze in github


// pentru a utiliza autetificare cu hash trebuie sa instalm md5  npmjs.com 

require('dotenv').config() //asa am activat dotnev trebuie pusa prima


 var bcrypt = require('bcryptjs') // instalam bcrypt.js

 var salt = bcrypt.genSaltSync(10); //adaugam cate salturi vrem(adica cate numere aditionale sa fie parola mai puternica)

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


    bcrypt.hash(req.body.password,salt,(err,hash)=>{
//aici am facut un encrypt la parola introdusa si salt (cate numere aditionale vrem sa baga la parola ,este facuta la inceput )
        const   newUser= new User({
            email:req.body.username,
            password: hash
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
 
})

//acum facem post la login 

app.post("/login",(req,res)=>{

    const username= req.body.username 
    const password =req.body.password 

//aici facem o verificare ca daca avem acest usuari sa ne duca la pagina secret cand facem login
  User.findOne({email:username},(err,foundUser) =>{
      if(err){
             res.send("err");    
      }else{
               //   iar aici verificam daca ce avem in foundUser.passowrd este lafe cu cea introdusa de usuario ne face un render la secrets
          if(foundUser){
   
//aici facem un check pentru a vedea daca parola utilizatoruluio coincide cu una deja existenta cu ajturu la bcrypt
        bcrypt.compare(password,foundUser.password,(err,result)=>{
    if(result===true){
          res.render("secrets")
    }
        }) 
    }
}})  
})


app.listen(3000,()=>{
console.log("server up on port 3000");
})