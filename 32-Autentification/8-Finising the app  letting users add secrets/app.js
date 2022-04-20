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

//pentru a utiliza google passport  intram aici sa vede mce e de facut
//https://www.passportjs.org/packages/passport-google-oauth20/

//creem un proiect in google developer console apoi la credentials  apoi mergem la oOath consent screen si aici configuram ce va vedea usuariul adica ce aplicatie etc
//la scopes de ex adaugam ce dorim sa vedem de la user

//dupa dam la credential create credential QAuth client ID
//la url punem ori http://localhost:3000 ori pagina care cere acces

//la auithorized redirect urls pnem http://localhost:3000/auth/google/secrets

///apoi o sa primim un clicent id si un client secret le copiem in .env file

//URMATORU PASA ESTE SA CONFIGURAM\

//astea 3 trebuie sa importam pentru a utiliza passport
const session=require("express-session")
const passport= require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose= require("passport-local-mongoose")
// importam google oath
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//si un requerie la metoda find or create
const findOrCreate =require("mongoose-findorcreate")



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
    password:String,
    //aici am adaugat un id pentru a salva id de la user care se conecteaza cu google
    googleId: String,
    secret:String
})

//iar aici spunem ca dorim sa folosim pasport in USer
userSechama.plugin(passportLocalMongoose)


//aici il adaugam ca un plugin
userSechama.plugin(findOrCreate)

const User= mongoose.model("User",userSechama)

//iar aici serializam si deserilizam User(adica cu serrializa codificam datele si cu deserilize le decodificam)

passport.use(User.createStrategy())

passport.serializeUser(function(user,done){
done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
})

//aici creem google strategi unde adauga client id din env si secret si la callback
//ce am setat pe pagina google
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //trebuie sa instalam mongoose-findorcreate si ii facem si un require
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//setam pagina default
app.get("/",(req,res)=>{
    res.render("home")
})

//aici creem o ruta pentru butonu de trimis la google auth
//spunam ca vrem sa autetifce utilizand google strategy si spuem ca dorim ce a vem in scope adica profilu userului
app.get("/auth/google",passport.authenticate('google', {
    scope: ['profile']
}));


//aici spunem odata ce ne am intrat pe pagina de la google si neam autentificat se ne redirectioneze la ruta noastra locala

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('/secrets');
  });

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


app.get("/secrets",(req,res)=>{
//iar aici o sa adaugam secretele ca sa le vada oricine  mai intai cautam toate secretele care au o valoare(asa se cauta) iar dupa le trimitem la pagina secret ca sa facem un map

User.find({"secret":{$ne:null}},(err,foundUsers)=>{
if(err){
    console.log(err);
}else{ 
    if(foundUsers){
    res.render("secrets",{usersWithSecrets:foundUsers})
    }
}
})

})



app.get("/submit",(req,res)=>{

    if(req.isAuthenticated()){
        res.render("submit")
           }else{
               res.redirect("/login")
           }
})

app.post("/submit",(req,res)=>{
    const submitedSecret =req.body.secret

    //pentru a vedea care user  vrea sa adauge un secret utilizam passport odatq ce facem clic in submit  o sa le accesam s idatele mai exact noi doriim sa scoatem id
    //de accea face un nou field unde o salvam  si secretu adaugat de user, la userSchema

    //iar acum cautam user duap id pentru ai adauga secretul lui
User.findById(req.user.id,(err,foundUser)=>{
    if(err){
        console.log(err);
    }else{
        if(foundUser){
            //daca useru exista o sa setam ce are la secret field la ce introudce in post si odata adaugat il salva si redirectionam
            foundUser.secret = submitedSecret
            foundUser.save(()=>{
                res.redirect("/secrets")
            })
            
        }
    }
})

    
})


app.get("/logout",(req,res)=>{

    //aici fom dezauntetifica useru si il vom trimie la pagina home
    req.logout()
        res.render("home")
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