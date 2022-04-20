// salvam expres in app pentru a initializa express
// pentru a lua dat din hhtps trebuie sa iif facem request

const https=require("https")
const express = require("express")
const { json } = require("express/lib/response")

const app=express()

// aici practic aratam ce o sa  se vadfa pe pagina root (trimitem tot fisieru index.html)
app.get("/",function(req,res){
// salvam url de ex de la wether intro onstanta pentru o o utilza in a scoate datele depsre vreme

const url = "https://api.openweathermap.org/data/2.5/weather?q=Buzau&units=metric&appid=dbafe88a6b45337add3d8fb21f6cea2e"
  
// aici putem folosi https pentr au aduce datele unde introducem ca parametru url si a doilea o functie cu response unde avem datele (console.log(response.statusCode) verificam status )
https.get(url,function(response){
console.log(response.statusCode)

// cu response on acesam continul de la weather,data fiind primu parametru adica cand primim niste data iar dupa uun callback care o sa contina data
//iar dupa cu json.parse o transformam in obiect js
response.on("data",function(data){
  const weatherData=  JSON.parse(data)

//   acum o sa slavam intro alta variabila ce data dorim sa accesam de la wheather
const temp=weatherData.main.temp
console.log(temp)

// aici acesand un array trebuie sa spunem pozitia
const description=weatherData.weather[0].description
console.log(description)
    
})
})
    res.send("Server is up")
})



app.listen(3000,function(){
    console.log("Server runinnig on port 3000")
})