const bodyParser = require("body-parser");
const express = require("express");

const app=express()

app.set('view engine', 'ejs');
// pentru a utiliza ejs trebuie sa adaugam urmatoarea comanda (trebuie pusa sub app=expres())
//trebuie sa creem si un folder views care trebuie sa aiba in intrerior index.ejs

app.use(bodyParser.urlencoded({extended:true}))

// trebuie sa instal ejs (si dupa ne uitam pe pagina la ejs cu express) pentru a vedea cum functioneaza

app.get("/",function(req,res){
    // aici putem sa scriem js crem o let in care salvam functia date

    let today = new Date()

    let curentDay=today.getDay()
    //iar dupa cu if vedem daca este o zi sau altga sa ne arate ceva cu getday() obtinem nr zile a saptamni ex 1 lunu
    //vedem daca este sambata sau duminica

    let day=""//crem un let day gol
    if(curentDay===0){
       day="saturday"

    }else if(curentDay===1){
        day="monday"
    }else if(curentDay===2){
        day="tusday"
    }else if(curentDay===3){
        day="wendsday"
    }else if(curentDay===4){
        day="thirday"
    }else if(curentDay===5){
        day="friday"
    }else if(curentDay===6){
        day="sunday"
    }
//   asa spunem sa faca un render la  fisieru list din ejs,al doilea parametru specificam ca kindOfday o sa fie day
    res.render("list",{kindOfDay:day})
})

app.listen(3000,function(){
    console.log("Server up on port 3000")
})