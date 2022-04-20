const bodyParser = require("body-parser");
const express = require("express");

const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    // aici putem sa scriem js crem o let in care salvam functia date

    let today = new Date()
    //iar dupa cu if vedem daca este o zi sau altga sa ne arate ceva cu getday() obtinem nr zile a saptamni ex 1 lunu
    //vedem daca este sambata sau duminica
    if(today.getDay()===6 || today.getDay()===0){
        // folosim res.write pentru a trimite mai multe instructiuni si cu send trimitem toate instructiunile
      res.write("<h1>wekkend</h1>") 
      res.write("<h1> it is is</h1>") 
        res.send()
    }else{
        res.sendFile(__dirname + "/index.html")
          
    }

})

app.listen(3000,function(){
    console.log("Server up on port 3000")
})