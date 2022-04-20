const bodyParser = require("body-parser");
const express = require("express");

const app=express()

// aici am creat un array items  care vine cu cateva iteme predefinite si pentru a adauga noile  item create in form si 
//in acelasi timp fiind globale sunt accestate de oriunde
let items=["fish","coke","strowbery"]

app.set('view engine', 'ejs');
// pentru a utiliza ejs trebuie sa adaugam urmatoarea comanda (trebuie pusa sub app=expres())
//trebuie sa creem si un folder views care trebuie sa aiba in intrerior index.ejs

app.use(bodyParser.urlencoded({extended:true}))

// trebuie sa instal ejs (si dupa ne uitam pe pagina la ejs cu express) pentru a vedea cum functioneaza

app.get("/",function(req,res){
    // aici putem sa scriem js crem o let in care salvam functia date

    let today = new Date()

    // creem un obiect unde vom define tot ce vine in date sub forma de numere in cuvinte 
    // (ex 1 in ianuarie)
  let options ={weekday: "long", year: "numeric", month: "long", day: "numeric"}

    
//   aici salvam today cu un format en cu ajutorul toLocaleDateString si apoi cu al doilea parametru ii facem formatu ca sa ne apara in forma de string
  let day=today.toLocaleDateString("en-US",options)


//   asa spunem sa faca un render la  fisieru list din ejs,al doilea parametru specificam ca kindOfday o sa fie day si putem sa adaugam mai multe variabile care dorim sa fie trimis la list(de ex a doua variabila eszte ce am obtinut din from post)
    res.render("list",{kindOfDay:day,newListItems:items})
})

app.post("/",function(req,res){
    // aici salvam in item ce primin de la form
    let item= req.body.newItem

    // si aici adaugam la arrayu nostru noul item
    items.push(item)

    //aici redirectionam la pagina home practic inainte sa incarce app.get("/")
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("Server up on port 3000")
})