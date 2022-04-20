// aici am install express body-parser si requestsi nodemon

const express = require("express")
const bodyParser= require("body-parser")
const request = require("request")
const https =require("https")

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

    //asa  construim data care o sa fie acceptat in mail chimp un array de obiecte denumite members toate detaliile trebuie sa fie lafel adica (members, email_address etc)
     const data={
         members:[
             {
                email_address: email,
                status: "subscribed",
                // ca sa facem merge intam la audience senting merge asa adaugam mai multe filduri inpreuna
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
             }
         ]
     };
     //asa trecem data noastra in format json si o salvam in variabila  jsonData
     const jsonData=JSON.stringify(data)

    //  aici salvam url unde vrem sa trimitiem data unde adaugam si list id nostru
    //iar dupa us punem api de la mail chimp
     const url="https://us14.api.mailchimp.com/3.0/lists/92202259e2"

     //aici creem a doilea parametru care este options

     const options={
         method:"POST",
        //  aici dupa auth trebuie sa fie unu lipit de altu
         auth: "fullmo0n:43132ed210ee1febc0a80941c712849f-us14"
     }

    //  pentru a face un post la o pagina externa facem request de post https pe care il salvam in request
   const request= https.request(url,options,function(response){
       
          
           //verifica daca data statusu este 200 atunci sa ne monstreze o pagina sau altaa
      if( response.statusCode ===200){
   
          res.sendFile(__dirname  + "/succes.html")
        
      }else{
          res.sendFile(__dirname + "/failure.html")
      }
      response.on("data",function(data){
          console.log(JSON.parse(data))
        })
        
    })
    
    // iar dupa ca sa ne triimitem arrayu data utiliziam urmatoarea comanda si cu request.end terminam tramsmiterea
    // request.write(jsonData)
    request.end()
 })

//  aici creem un post pentru a redirectiona catre pagina signup in caz ca apasam butonu din failure
 app.post("/failure",function(req,res){
res.redirect("/")
 })
 app.listen(3000,function(){
     console.log("Server up on port 3000")
 })


//  api de la mail chimp

// 43132ed210ee1febc0a80941c712849f-us14

//list id 92202259e2