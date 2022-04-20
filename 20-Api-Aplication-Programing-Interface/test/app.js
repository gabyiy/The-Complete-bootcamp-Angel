const express = require ("express")
const bodyParser= require("body-parser")
const https = require("https")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html")

})

app.post("/",function(req,res){
    const oras= req.body.city

    const url="https://api.openweathermap.org/data/2.5/weather?q="+oras+"&units=metric&appid=dbafe88a6b45337add3d8fb21f6cea2e"

    https.get(url,function(response){

        response.on("data",function(data){
            const vreme=JSON.parse(data)
            const temp = vreme.main.temp
            const descriptie = vreme.weather[0].description 
            const imagine =vreme.weather[0].icon

            const url= "http://openweathermap.org/img/wn/"+imagine+"@2x.png" 
            res.write("<p>Cerul este "+ descriptie +"</p>")
            res.write("<h1>In "+ oras + " avem o temperatura de " + temp + "</h1>")
            res.write("<img src=" +url + ">")
            res.send()
        })
    })

})


app.listen(3000,function(){
    console.log("Server up on port 3000")
})