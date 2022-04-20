// aici am install express body-parser si requestsi nodemon

const express = require("express")
const bodyParser= require("body-parser")
const request = require("request")

const app =express()

//pentru a recunoaste  css si tot ce avem de forma locala in  proyect trebuie sa folosim urmatoarea comanda*practic o sa ne recunuasca foleru public aici)
app.use(express.static("public"))

 app.use(bodyParser.urlencoded({extended:true}))

 app.get('/',function(req,res){
     res.sendFile(__dirname + "/signup.html")
 })

 app.post("/",function(req,res){
     const firstName=req.body.fName
     const lastName=req.body.lName
     const email=req.body.email
     console.log( "Hi " + firstName + " " + lastName + " with the email of " + email)
 })
 app.listen(3000,function(){
     console.log("Server up on port 3000")
 })
