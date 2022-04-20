// salvam expres in app pentru a initializa express
// pentru a lua dat din hhtps trebuie sa iif facem request si al utiliza pentru a extrage informati nu trebuie instalat

const https=require("https")
const express = require("express")
const bodyParser=require("body-parser")

const app=express()
app.use(bodyParser.urlencoded({extended:true}))

// aici practic aratam ce o sa  se vadfa pe pagina root (trimitem tot fisieru index.html)
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html")
})

// aici salvam ce introduce usuario in field
app.post("/",function(req,res){
// salvam url de ex de la wether intro onstanta pentru o o utilza in a scoate datele depsre vreme


// aici impartim url in mai multe parti si salvam de forma diunamic oras in functie de ce introduce useru
const query=req.body.city
const apiKey="dbafe88a6b45337add3d8fb21f6cea2e"
const units="&units=metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid="+apiKey  + units
  
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

// pentru a lua imagine trebueie sa intram in weather conditions
const icon=weatherData.weather[0].icon
const imageUrl= "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
  
// iar aici trimite data catre pagina creata de noi 
//ca sa trimitem mai multe date utilizam res.write
res.write("<h3>The weather is curently " + description +"</h3>")
res.write("<h1> And the temperature in  "+query + temp + " degrees </h1>")
res.write("<img src=" +imageUrl +">")
res.send()
})
})

})


app.listen(3000,function(){
    console.log("Server runinnig on port 3000")
})