const bodyParser = require("body-parser");
const express = require("express");

const app=express()

// aici am creat un array items  care vine cu cateva iteme predefinite si pentru a adauga noile  item create in form si 
//in acelasi timp fiind globale sunt accestate de oriunde
let items=["fish","coke","strowbery"]
let workItems =[]

app.set('view engine', 'ejs');
// pentru a utiliza ejs trebuie sa adaugam urmatoarea comanda (trebuie pusa sub app=expres())
//trebuie sa creem si un folder views care trebuie sa aiba in intrerior index.ejs

app.use(bodyParser.urlencoded({extended:true}))

// trebuie sa instal ejs (si dupa ne uitam pe pagina la ejs cu express) pentru a vedea cum functioneaza


// pentru a adauga css nostru trebuese sa folosim urmatoarea comanda indicand locatia css
app.use(express.static( 'public'))

app.get("/",function(req,res){
    // aici putem sa scriem js crem o let in care salvam functia date

    let today = new Date()

    // creem un obiect unde vom define tot ce vine in date sub forma de numere in cuvinte 
    // (ex 1 in ianuarie)
  let options ={weekday: "long", year: "numeric", month: "long", day: "numeric"}

    
//   aici salvam today cu un format en cu ajutorul toLocaleDateString si apoi cu al doilea parametru ii facem formatu ca sa ne apara in forma de string
  let day=today.toLocaleDateString("en-US",options)


//   asa spunem sa faca un render la  fisieru list din ejs,al doilea parametru specificam ca kindOfday o sa fie day si putem sa adaugam mai multe variabile care dorim sa fie trimis la list(de ex a doua variabila eszte ce am obtinut din from post)
    res.render("list",{listTitle:day,newListItems:items})
})

app.post("/",function(req,res){
    // aici salvam in item ce primin de la form
    let item= req.body.newItem
    // asa putem vedea unde a fost adaugat itemu nou creat in list.ejs sau in workItems
    console.log(req.body)

    // asa putem spune cun un if daca a fost creat in default list sa se adauge la items ,daca este facut in workm sa se adauge la workitems
    if(req.body.list==="/"){
       // si aici adaugam la arrayu nostru noul item
      items.push(item)
      //aici redirectionam la pagina home practic inainte sa incarce app.get("/")
    res.redirect("/")
    }else if(req.body.list==="Work"){
      workItems.push(item)
      res.redirect("/work")   
    }
})

app.get("/work",function(req,res){
  // o sa rederizam ce avem in list.ejs(practic copiem componentu)
res.render("list",{listTitle:"Work List",newListItems:workItems})
})


app.get("/about",function(req,res){
    res.render("about")
  })

app.listen(3000,function(){
    console.log("Server up on port 3000")
})