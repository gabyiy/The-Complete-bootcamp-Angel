const express= require("express");

const app=express();

app.get("/",function(req,res){
// cu res.sendFile trimitem un file intreg ca index.html ca sa se renderizeze si cu __dirname ii gaseste locatgia filului oriunde ar fi el  si dupa adaugam filu care dorim  sa renderizam cum ar fiindex.html 
    res.sendFile(__dirname + "/index.html")
});


app.listen(3000,function(){
    console.log("server runing on port 3000")
})