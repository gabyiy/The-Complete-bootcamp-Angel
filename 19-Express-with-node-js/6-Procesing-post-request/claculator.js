// pentru a face un post de la datele introduse trebuie sa instalam npm body-parser
//ii facem si lui un requier
const express= require("express");
const bodyParser= require("body-parser");
const { urlencoded } = require("body-parser");

const app=express();
// ca sa adaugam la app body-parser pentru a transmite date care vinde de la un fisier html trebuie sa utilizam app.use(bodyParser.urlencoded()) si cu extended true putem sa  postam nested objects
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
// cu res.sendFile trimitem un file intreg ca index.html ca sa se renderizeze si cu __dirname ii gaseste locatgia filului oriunde ar fi el  si dupa adaugam filu care dorim  sa renderizam cum ar fiindex.html 
    res.sendFile(__dirname + "/index.html")
});



// dupa ce am primit datele putem face un post 
app.post("/",function(req,res){
    // aici practi salvam in variabile ce introducem in input si cu number il transformam in int
    var num1= Number(req.body.num1);
    var num2=Number(req.body.num2);
    var result=num1+num2
    res.send("The result of the claculation is" + " "+result)
    
})

app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bmiCalculator",function(req,res){
    var weight= parseFloat(req.body.weight)
    var height= parseFloat(req.body.height)
    var bmi= weight  /(height * height)
    res.send("Your bmi is " + bmi)
})

app.get("/second.html",function(req,res){
res.sendFile(__dirname + "/second.html")
})


app.listen(3000,function(){
    console.log("server runing on port 3000")
})