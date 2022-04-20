//jshint esversion:6

// tot ce instalam noi se gaseste in npm.js aici gasim toate pachetele cu documentatia

// pentru a utiliza passport.js si cookie trebuie sa instalam

// passport, passport-local, passport-local-mongoose, express-session

// ---------------------------------------------------------------
//pentru a utilza encriptie utilizam mongoose-encryption
//pentru a utiliza variabile de enviormete pentr ucodificare utilizam dotenv din npmjs.com 
//trebuie sa creem o variabila env
//adaugam fisieru in git ignore ca nu se se salveze in github


// pentru a utiliza autetificare cu hash trebuie sa instalm md5  npmjs.com 

require('dotenv').config() //asa am activat dotnev trebuie pusa prima



const express= require("express")
const ejs=require("ejs")
const bodyParser=require("body-parser")
const mongoose  = require("mongoose")

//astea 3 trebuie sa importam pentru a utiliza passport
const session=require("express-session")
const passport= require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose= require("passport-local-mongoose")


const app=express()


app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))


//aici trebue sa utilizam session

app.use(session({
    //asta o sa fie parola
    secret:"Our little secret.",
    resave: false,
    saveUninitialized:false,
    cookie:{}
}))

//pentru a initializa session folosim urmatoarea comanda

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect("mongodb://localhost:27017/usersDB")




//creem schema si modelu
const userSechama= new mongoose.Schema({
    email:String,
    //paswordu o sa il faca in strign asa ca trebuie sa fie de tip string
    password:String
})

userSechama.plugin(passportLocalMongoose)
//iar aici spunem ca dorim sa folosim pasport in USer


const User= mongoose.model("User",userSechama)

//iar aici serializam si deserilizam User(adica cu serrializa codificam datele si cu deserilize le decodificam)

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
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



app.get("/logout",(req,res)=>{

//aici fom dezauntetifica useru si il vom trimie la pagina home
req.logout()
    res.render("home")
})



app.get("/secrets",(req,res)=>{
    //aici facem un control sa vedem daca req este autetificamta 
    if(req.isAuthenticated()){
 res.render("secrets")
    }else{
        res.redirect("/login")
    }
})


app.post("/register",(req,res)=>{

    //asa adaugam un nou user cu ajustoru la mongoose passport
User.register({
    //adaugam username si pasu iar al treilea parametru este functia cu err si userul resultat de la username si pass
    username: req.body.username 
}, req.body.password,(err,user)=>{

    // si aici spunem daca avem erroare sa ne redirectioneze la pagina de registger ca sa nu putem inregistra inco odata daca nu sa folosim passport
if(err){
    console.log(err);
    res.redirect("/register")
}else{
    //face o autentificare de tip local si dupa i itrecem o functie ca si calback 
    //care se activeaza doar daca autetificarea a avut succes
   passport.authenticate("local")(req,res,()=>{
res.redirect("/secrets")
   })
}
})


 
})

//acum facem post la login 

app.post("/login",(req,res)=>{

    const user= new User({
        username:req.body.username,
        password:req.body.password
    })
    //dupa ce am creat useru trtebue sa face  un passport login request in felu urmator

    req.login(user,(err)=>{
        if(err){
            console.log(err);
        }else{
            //sa daca tot u este bine sa ne autetifice useru si sa il redirectioneze ;a pagina secret
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secrets")
                  })
    }
   
})
})

app.listen(3000,()=>{
console.log("server up on port 3000");
})